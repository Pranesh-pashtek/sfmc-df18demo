'use strict';

import express = require("express");
import jwt = require('jwt-simple');
import SfmcApiHelper from './SfmcApiHelper';
import Utils from './Utils';


// <!-- Integrate an externally hosted app via iframe. -->
export default class SfmcAppDemoRoutes
{
    // Instance variables
    private _apiHelper = new SfmcApiHelper();

    /**
     * login: called by Marketing Cloud when hosted app is launched. Decodes JWT in BODY passed by Marketing Cloud.
     * Handles POST on: /login
     * 
     * Marketing Cloud does a POST on the '/login' route with the following JSON BODY:
     * {
     *  "jwt" : "<encoded JWT from SFMC>"
     * }
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/decode-jwt.htm
     * More info: https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/explanation-decoded-jwt.htm
     * 
     */
    public login(req: express.Request, res: express.Response)
    {
        let self = this;
        let sessionId = req.session.id;
        Utils.logInfo("login called. SessionId = " + sessionId);

        req.session.jwtFromSFMC = "";
        req.session.decodedJWT = "";
        req.session.refreshTokenFromJWT = "";
        req.session.oauthAccessToken = "";
        req.session.oauthAccessTokenExpiry = "";

        // Decode JWT with the secret from environment variable.
        try
        {
            // Decode JWT
            let encodedJWT = JSON.stringify(req.body.jwt);
            let jwtSecret = "buPkNIXn2JrYFtCBcDi7elb1tw1D3EfuLh_Is-BfHHwTa3_DSjmEYoVpE0M0FN5fYAeeyY3zqDOg70_SfO4zVl7z457wLh3XiPMAcPE0HV_oWio-d8YkmEM3yUSGQcrvc5pMR7JpCz8K8boj4MkZKuj60j5FOfig5d5bScry_RF9tF42Mnqcp80QqnhzKH4Ma9z7o4mILfU4ovqfwLlhBnp0BNRZXX2hWVfx9D8aIUPtH2j5R4p7YD4jfSE22Q2";
            Utils.logInfo("Decoding JWT with secret from DF18DEMO_JWTSECRET = " + jwtSecret);
            req.session.decodedJWT = jwt.decode(encodedJWT, jwtSecret, true); // pass 'noVerify = true' for this demo
            
            // Store JWT in the current session for redirect URL to pick up for display
            req.session.jwtFromSFMC = Utils.prettyPrintJson(JSON.stringify(req.session.decodedJWT));
            Utils.logInfo("Decoded JWT from SFMC = \n" + req.session.jwtFromSFMC);

            // Get refreshToken from JWT and store in the current session for redirect URL to pick up for display
            req.session.refreshTokenFromJWT = req.session.decodedJWT.request.rest.refreshToken;
            Utils.logInfo("refreshToken from JWT = \n" + req.session.refreshTokenFromJWT);

            let redirectUrl = req.session.decodedJWT.request.application.redirectUrl;
            Utils.logInfo("Redirecting to: \n" + JSON.stringify(redirectUrl));
            res.redirect(redirectUrl); // redirect to MC app landing page
        }
        catch(error)
        {
            let errorMsg = "Error while decoding JWT. Message: " + error;
            Utils.logError(errorMsg);
            res.status(400).send(errorMsg);
        }
    }
   
    /**
     * POST handler for: /logout
     * logout: called by Marketing Cloud when user logs out
     * 
     */
    public logout(req: express.Request, res: express.Response)
    {
        let sessionId = req.session.id;
        Utils.logInfo("logout called. SessionId = " + sessionId);

        // Clear out JWT and everything we got from it.
        req.session.jwtFromSFMC = "";
        req.session.decodedJWT = "";
        req.session.refreshTokenFromJWT = "";
        req.session.oauthAccessToken = "";
        req.session.oauthAccessTokenExpiry = "";
    
        res.sendStatus(202); // accepted
    }

    /**
     * GET handler for: /appdemooauthtoken
     * getOAuthAccessToken: called by demo app to get an OAuth access token
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-getting-started.meta/mc-getting-started/get-access-token.htm
     * 
     */
    public getOAuthAccessToken(req: express.Request, res: express.Response)
    {
        let self = this;
        let sessionId = req.session.id;
        let clientId = "w687o5zzf0vc6m8csgmzeyo3";
        let clientSecret = "SAEwgNNnZhRCO3uraqZKaoPQ";
        let grant_type = "client_credentials"
        req.session.oauthAccessToken = "";
        req.session.oauthAccessTokenExpiry = "";

        Utils.logInfo("getOAuthAccessToken route entered. SessionId = " + sessionId);

        if (clientId && clientSecret)
        {
            if (req.session.refreshTokenFromJWT)
            {
                Utils.logInfo("Getting OAuth Access Token with ClientID and ClientSecret from in environment variables and refreshToken: " + req.session.refreshTokenFromJWT);
    
                self._apiHelper.getOAuthAccessTokenFromRefreshToken(clientId, clientSecret, req.session.refreshTokenFromJWT,req)
                .then((result) => {
                    req.session.oauthAccessToken = result.oauthAccessToken;
                    req.session.oauthAccessTokenExpiry = result.oauthAccessTokenExpiry;
                    res.status(result.status).send(result.statusText);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            }
            else
            {
                // error
                let errorMsg = "refreshToken *not* found in session.\nCheck the '/login' URL specified in your\nMarketing Cloud App configuration."; 
                Utils.logError(errorMsg);
                res.status(500).send(errorMsg);
            }
        }
        else
        {
            // error
            let errorMsg = "ClientID or ClientSecret *not* found in environment variables."; 
            Utils.logError(errorMsg);
            res.status(500).send(errorMsg);
        }
    }
}