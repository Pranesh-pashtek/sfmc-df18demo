'use strict';
import axios from 'axios';
// import path = require('path');
import express = require("express");
import SfmcApiHelper from './SfmcApiHelper';
import Utils from './Utils';

export default class SfmcApiDemoRoutes
{
    // Instance variables
    private _apiHelper = new SfmcApiHelper();

    /**
     * GET handler for /apidemooauthtoken
     * getOAuthAccessToken: called by demo app to get an OAuth access token with ClientId/ClientSecret in environment variables
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
        var soap_instance_url = "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.soap.marketingcloudapis.com/"
        var FolderID="514024529"
        var member_id="Appstesting45"
        // var data = [];
        Utils.logInfo("getOAuthAccessToken route entered. SessionId = " + sessionId);
        Utils.logInfo("piejhgioph"+clientId);
        if (clientId && clientSecret)
        {
            Utils.logInfo("Getting OAuth Access Token with ClientID and ClientSecret from in environment variables.");

            self._apiHelper.getOAuthAccessToken(clientId, clientSecret, grant_type, req)
            .then((result) => {
                // console.log(result,"dfghj");
               
                
                req.session.oauthAccessToken = result.oauthAccessToken;
                req.session.oauthAccessTokenExpiry = result.oauthAccessTokenExpiry;
                res.status(result.status).send(result.statusText);
                // var sample = data.push(result.oauthAccessToken)
        //   console.log(sample,"netgofnhosdfnoghidghdtub");

                    // let DCmsg =
                    // '<?xml version="1.0" encoding="UTF-8"?>' +
                    // '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
                    // "    <s:Header>" +
                    // '        <a:Action s:mustUnderstand="1">Create</a:Action>' +
                    // '        <a:To s:mustUnderstand="1">' +
                    // soap_instance_url +
                    // "Service.asmx" +
                    // "</a:To>" +
                    // '        <fueloauth xmlns="http://exacttarget.com">' +
                    // result.oauthAccessToken +
                    // "</fueloauth>" +
                    // "    </s:Header>" +
                    // '    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
                    // '        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
                    // '            <Objects xsi:type="DataExtension">' +
                    // "                <CategoryID>" +
                    // FolderID +
                    // "</CategoryID>" +
                    // "                <CustomerKey>Domain Configuration-" +
                    // member_id +
                    // "</CustomerKey>" +
                    // "                <Name>Domain Configuration-" +
                    // member_id +
                    // "</Name>" +
                    // "                <Fields>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Domain ID</CustomerKey>" +
                    // "                        <Name>Domain ID</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>50</MaxLength>" +
                    // "                        <IsRequired>true</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Domain Name</CustomerKey>" +
                    // "                        <Name>Domain Name</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>100</MaxLength>" +
                    // "                        <IsRequired>true</IsRequired>" +
                    // "                        <IsPrimaryKey>true</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Inbox Threshold</CustomerKey>" +
                    // "                        <Name>Inbox Threshold</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>100</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Engagement Threshold</CustomerKey>" +
                    // "                        <Name>Engagement Threshold</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>100</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>SPF Threshold</CustomerKey>" +
                    // "                        <Name>SPF Threshold</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>100</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>DKIM Threshold</CustomerKey>" +
                    // "                        <Name>DKIM Threshold</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>100</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Campaign Min</CustomerKey>" +
                    // "                        <Name>Campaign Min</Name>" +
                    // "                        <FieldType>Decimal</FieldType>" +
                    // "                        <Precision>18</Precision>" +
                    // "                          <Scale>0</Scale>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Intelliseed Lists</CustomerKey>" +
                    // "                        <Name>Intelliseed Lists</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>250</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Threshold Recipe</CustomerKey>" +
                    // "                        <Name>Threshold Recipe</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>250</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Rules Recipe</CustomerKey>" +
                    // "                        <Name>Rules Recipe</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <MaxLength>250</MaxLength>" +
                    // "                        <IsRequired>false</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Created or Modified by</CustomerKey>" +
                    // "                        <Name>Created or Modified by</Name>" +
                    // "                        <FieldType>Text</FieldType>" +
                    // "                        <IsRequired>true</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                    <Field>" +
                    // "                        <CustomerKey>Created or Modified date</CustomerKey>" +
                    // "                        <Name>Created or Modified date</Name>" +
                    // "                        <FieldType>Date</FieldType>" +
                    // "						  <DefaultValue>getdate()</DefaultValue>" +
                    // "                        <IsRequired>true</IsRequired>" +
                    // "                        <IsPrimaryKey>false</IsPrimaryKey>" +
                    // "                    </Field>" +
                    // "                </Fields>" +
                    // "            </Objects>" +
                    // "        </CreateRequest>" +
                    // "    </s:Body>" +
                    // "</s:Envelope>";

                    // return new Promise<any>((resolve, reject) => {
                    //     let headers = {
                    //       "Content-Type": "text/xml",
                    //     };
                    //     axios({
                    //         method: "post",
                    //         url: "https://mcj6cy1x9m-t5h5tz0bfsyqj38ky.soap.marketingcloudapis.com/" + "Service.asmx",
                    //         data: DCmsg,
                    //         headers: headers,
                    //       }).then((response: any) => {
                    //       })
                    //     //   console.log(req.session.oauthAccessToken,"hfnjigbjisbigbsibgi");
                    // })
                    
            })
            .catch((err) => {
                res.status(500).send(err);
            });
        }
        else
        {
            // error
            let errorMsg = "ClientID or ClientSecret *not* found in environment variables."; 
            Utils.logError(errorMsg);
            res.status(500).send(errorMsg);
        }
        
    }
    
    /**
     * GET handler for /apidemoloaddata
     * loadData: called by the demo app to load sample data into the Data Extension "DF18Demo";'
     * 
     * More info: https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/postDataExtensionRowsetByKey.htm
     * 
     */
    public loadData(req: express.Request, res: express.Response)
    {
        let self = this;
        Utils.logInfo("loadData route entered.");
        self._apiHelper.loadData(req, res);
    }
}