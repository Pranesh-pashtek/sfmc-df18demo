'use strict';

import axios from 'axios';
import express = require("express");
import Utils from './Utils';

var xml2js = require("xml2js");
// var xml2js = require('xml-js');

export default class SfmcApiHelper
{

    // Instance variables
    private _deExternalKey = "DemoTable01";
    private _sfmcDataExtensionApiUrl = "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.rest.marketingcloudapis.com/hub/v1/dataevents/key:" + this._deExternalKey + "/rowset";

    /**
     * getOAuthAccessToken: POSTs to SFMC Auth URL to get an OAuth access token with the given ClientId and ClientSecret
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-getting-started.meta/mc-getting-started/get-access-token.htm
     * 
     */
    public getOAuthAccessToken(clientId: string, clientSecret: string, grant_type: string, req: express.Request) : Promise<any>
    {
        let self = this;
        Utils.logInfo("getOAuthAccessToken called.");
        Utils.logInfo("Using specified ClientID and ClientSecret to get OAuth token...!!!!");
        Utils.logInfo("clientId");
        console.log(clientId , clientSecret , grant_type);
        
        let headers = {
            'Content-Type': 'application/json',
        };

        let postBody = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grant_type
        };
        let headers2 = {
            "Content-Type": "text/xml",
          };
        return self.getOAuthTokenHelper(headers, postBody, headers2, req);
    }

    /**
     * getOAuthAccessTokenFromRefreshToken: POSTs to SFMC Auth URL to get an OAuth access token with the given refreshToken
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-getting-started.meta/mc-getting-started/get-access-token.htm
     * 
     */
    public getOAuthAccessTokenFromRefreshToken(clientId: string, clientSecret: string, refreshToken: string, req: express.Request) : Promise<any>
    {
        let self = this;
        Utils.logInfo("getOAuthAccessTokenFromRefreshToken called.");
        Utils.logInfo("Getting OAuth Access Token with refreshToken: " + refreshToken);
        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJZSFIwNTZuektXN3RHYTZxMlB2WG9YYVEiLCJjbGllbnRfaWQiOiJ3Njg3bzV6emYwdmM2bThjc2dtemV5bzMiLCJlaWQiOjUxNDAwNTc5OCwic3RhY2tfa2V5IjoiUzExIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciIsInBpZCI6NjE0fQ.aa2D6d-dewNTUwfBwSxsrWSGxoyBzsUC5GM_rAHEUM8.LYwEsFuu_OhonDksL8L-KNO8jVKt1rkSpG_O2kFHHPUcHYO16lkKY39kvLm8n4v9gPk3B7Sh0FbS8Qvr4CKnIX9DDxE_SD15sSrSSBoAVgTk0FlIDxVBe0ws4_hOH4JdvZs5eI95vji7vVWKz4g80psHBxDIXxFqApTFE"
        };

        let postBody = [
            {
              "keys": {
                "id": "oE5IuSlTY"
              },
              "values": {
                "name": "Sanjay - GNd7uDYD_U",
                "email": "sanjay-a-8W6yjkN8@sanjay.com"
              }
            },
            {
              "keys": {
                "id": "nSPtbX7IyC"
              },
              "values": {
                "name": "Savita - 1ebuy-vtP_",
                "email": "savita-AWtrW227L1@savita.com"
              }
            }
          ]
          let headers2 = {
            "Content-Type": "text/xml",
        };
        return self.getOAuthTokenHelper(headers, postBody, headers2, req);
    }

    /**
     * getOAuthTokenHelper: Helper method to POST the given header & body to the SFMC Auth endpoint
     * 
     */
    public getOAuthTokenHelper(headers : any, postBody: any, headers2 : any, req: any  ) : Promise<any>
    {        
        return new Promise<any>((resolve, reject) =>
        {
            // var AccessToken = [];

            var FolderID="514024529"
            var member_id="Appstesting45"
            // console.log(headers,"ihnweuogbfuy9wef9gwer9pfyqwevp9fv");
            // POST to Marketing Cloud REST Auth service and get back an OAuth access token.
            let sfmcAuthServiceApiUrl = "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.auth.marketingcloudapis.com/v2/token"; //https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.auth.marketingcloudapis.com/v1/requestToken
            axios.post(sfmcAuthServiceApiUrl, postBody, {"headers" : headers})

            .then((response: any) => {
                
                // console.log(response,"lplppoiofdgisbifgbsibfiahwigwegyg");                
                // success
                let access_token = response.data.access_token;
                let tokenExpiry = new Date();
                tokenExpiry.setSeconds(tokenExpiry.getSeconds() + response.data.expires_in);
                Utils.logInfo("Got OAuth token: " + access_token + ", expires = " +  tokenExpiry);
                // var val = AccessToken.push(access_token);

console.log(access_token,"lkapdoofmfgnpngvpn");


                resolve(
                {
                    oauthAccessToken: access_token,
                    oauthAccessTokenExpiry: tokenExpiry,
                    status: response.status,
                    statusText: response.statusText + "\n" + Utils.prettyPrintJson(JSON.stringify(response.data))
                });
                var soap_instance_url = "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.soap.marketingcloudapis.com/"
                // var FolderID="30510"
                var member_id1="DemoTable01"
                var member_id="DM-App"
                let createFolderData =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
        "<soapenv:Header>" +
        "<fueloauth>" +
        access_token +
        "</fueloauth>" +
        "</soapenv:Header>" +
        "<soapenv:Body>" +
        '<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
        "<Options/>" +
        '<ns1:Objects xmlns:ns1="http://exacttarget.com/wsdl/partnerAPI" xsi:type="ns1:DataFolder">' +
        '<ns1:ModifiedDate xsi:nil="true"/>' +
        '<ns1:ObjectID xsi:nil="true"/>' +
        "<ns1:CustomerKey>mcapp44 - " +
         member_id +
        "</ns1:CustomerKey>" +
        "<ns1:ParentFolder>" +
        '<ns1:ModifiedDate xsi:nil="true"/>' +
        "<ns1:ID> 30510" +
         
        "</ns1:ID>" +
        '<ns1:ObjectID xsi:nil="true"/>' +
        "</ns1:ParentFolder>" +
        "<ns1:Name>mcapp44 - " +
        member_id +
        "</ns1:Name>" +
        "<ns1:Description>Smcapp44- " +
        member_id +
        " Folder</ns1:Description>" +
        "<ns1:ContentType>dataextension</ns1:ContentType>" +
        "<ns1:IsActive>true</ns1:IsActive>" +
        "<ns1:IsEditable>true</ns1:IsEditable>" +
        "<ns1:AllowChildren>true</ns1:AllowChildren>" +
        "</ns1:Objects>" +
        "</CreateRequest>" +
        "</soapenv:Body>" +
        "</soapenv:Envelope>";

        return new Promise<any>((resolve, reject) => {
          let headers3 = {
            "Content-Type": "text/xml",
            SOAPAction: "Create",
          };

          // POST to Marketing Cloud Data Extension endpoint to load sample data in the POST body
          axios({
            method: "post",
            url: "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.soap.marketingcloudapis.com/Service.asmx" + "",
            data: createFolderData,
            headers: headers3,
          })
            .then((response: any) => {
                var parser = new xml2js.Parser();
                parser.parseString(
                    response.data,
                    (
                      err: any,
                      result: {
                        [x: string]: {
                          [x: string]: { [x: string]: { [x: string]: any }[] }[];
                        };
                      }
                    ) => {
                        let FolderID =
                          result["soap:Envelope"]["soap:Body"][0][
                          "CreateResponse"
                          ][0]["Results"][0]["NewID"][0];
                          // console.log(FolderID,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                   
        
                let DCmsg =
                    '<?xml version="1.0" encoding="UTF-8"?>' +
                    '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
                    "    <s:Header>" +
                    '        <a:Action s:mustUnderstand="1">Create</a:Action>' +
                    '        <a:To s:mustUnderstand="1">' +
                    soap_instance_url +
                    "Service.asmx" +
                    "</a:To>" +
                    '        <fueloauth xmlns="http://exacttarget.com">' +
                    access_token +
                    "</fueloauth>" +
                    "    </s:Header>" +
                    '    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
                    '        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
                    '            <Objects xsi:type="DataExtension">' +
                    "                <CategoryID>" +
                    FolderID +
                    "</CategoryID>" +
                    "                <CustomerKey>" +
                    member_id1 +
                    "</CustomerKey>" +
                    "                <Name>" +
                    member_id1 +
                    "</Name>" +
                    "                <Fields>" +
                    "                    <Field>" +
                    "                        <CustomerKey>id</CustomerKey>" +
                    "                        <Name>id</Name>" +
                    "                        <FieldType>Text</FieldType>" +
                    "                        <MaxLength>15</MaxLength>" +
                    "                        <IsRequired>true</IsRequired>" +
                    "                        <IsPrimaryKey>true</IsPrimaryKey>" +
                    "                    </Field>" +
                    "                    <Field>" +
                    "                        <CustomerKey>name</CustomerKey>" +
                    "                        <Name>name</Name>" +
                    "                        <FieldType>Text</FieldType>" +
                    "                        <MaxLength>50</MaxLength>" +
                    "                        <IsRequired>true</IsRequired>" +
                    "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    "                    </Field>" +
                    "                    <Field>" +
                    "                        <CustomerKey>email</CustomerKey>" +
                    "                        <Name>email</Name>" +
                    "                        <FieldType>EmailAddress</FieldType>" +
                    "                        <IsRequired>false</IsRequired>" +
                    "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    "                    </Field>" +
                    "                    <Field>" +
                    "                        <CustomerKey>created_dts</CustomerKey>" +
                    "                        <Name>created_dts</Name>" +
                    "                        <FieldType>Date</FieldType>" +
                    "                        <IsRequired>false</IsRequired>" +
                    "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    "                    </Field>" +
                    "                </Fields>" +
                    "            </Objects>" +
                    "        </CreateRequest>" +
                    "    </s:Body>" +
                    "</s:Envelope>";
                    
                    return new Promise<any>((resolve, reject) => {
                        let headers2 = {
                          "Content-Type": "text/xml",
                        };
                        axios({
                            method: "post",
                            url: "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.soap.marketingcloudapis.com/Service.asmx",
                            data: DCmsg,
                            headers: headers2,
                          }).then((response: any) => {
                            // console.log(response,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
                            
                          })
                        //   console.log(req.session.oauthAccessToken,"hfnjigbjisbigbsibgi");
                    })
            })
        })                   
                
    })
            // axios({
            //     method: "post",
            //     url: "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.soap.marketingcloudapis.com/" + "Service.asmx",
            //     data: DCmsg,
            //     headers: headers2,
            //   }).then((response: any) => {
            //   })
            .catch((error: any) => {
                // error
                let errorMsg = "Error getting OAuth Access Token.";
                errorMsg += "\nMessage: " + error.message;
                errorMsg += "\nStatus: " + error.response ? error.response.status : "<None>";
                errorMsg += "\nResponse data: " + error.response ? Utils.prettyPrintJson(JSON.stringify(error.response.data)) : "<None>";
                Utils.logError(errorMsg);

                reject(errorMsg);
            });
        });
    })
    }

    /**
     * loadData: called by the GET handlers for /apidemoloaddata and /appdemoloaddata
     * 
     */
    public loadData(req: express.Request, res: express.Response)
    {
        let self = this;
        let sessionId = req.session.id;
        Utils.logInfo("loadData entered. SessionId = " + sessionId);

        if (req.session.oauthAccessToken)
        {
            Utils.logInfo("Using OAuth token: " + req.session.oauthAccessToken);
            self.loadDataHelper(req.session.oauthAccessToken, req.session.sampleJsonData)
            .then((result) => {
                res.status(result.status).send(result.statusText);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
        }
        else
        {
            // error
            let errorMsg = "OAuth Access Token *not* found in session.\nPlease complete previous demo step\nto get an OAuth Access Token."; 
            Utils.logError(errorMsg);
            res.status(500).send(errorMsg);
        }
    }

    /**
     * loadDataHelper: uses the given OAuthAccessToklen to load JSON data into the Data Extension with external key "DF18Demo"
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/postDataExtensionRowsetByKey.htm
     * 
     */
    private loadDataHelper(oauthAccessToken: string, jsonData: string) : Promise<any>    
    {
        let self = this;
        Utils.logInfo("loadDataHelper called.");
        Utils.logInfo("Loading sample data into Data Extension: " + self._deExternalKey);
        Utils.logInfo("Using OAuth token: " + oauthAccessToken);

        return new Promise<any>((resolve, reject) =>
        {
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + oauthAccessToken
            };

            // POST to Marketing Cloud Data Extension endpoint to load sample data in the POST body
            axios.post(self._sfmcDataExtensionApiUrl, jsonData, {"headers" : headers})
            .then((response: any) => {
                // success
                Utils.logInfo("Successfully loaded sample data into Data Extension!");

                resolve(
                {
                    status: response.status,
                    statusText: response.statusText + "\n" + Utils.prettyPrintJson(JSON.stringify(response.data))
                });
            })
            .catch((error: any) => {
                // error
                let errorMsg = "Error loading sample data. POST response from Marketing Cloud:";
                errorMsg += "\nMessage: " + error.message;
                errorMsg += "\nStatus: " + error.response ? error.response.status : "<None>";
                errorMsg += "\nResponse data: " + error.response.data ? Utils.prettyPrintJson(JSON.stringify(error.response.data)) : "<None>";
                Utils.logError(errorMsg);

                reject(errorMsg);
            });
        });
    }
}