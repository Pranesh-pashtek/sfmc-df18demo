// public creatingDomainConfigurationDE(
//     req: express.Request,
//     res: express.Response,
//     member_id: string,
//     soap_instance_url: string,
//     refreshToken: string,
//     FolderID: string,
//     tssd: string
//   ) {
//     //this.getRefreshTokenHelper(this._accessToken, res);
//     console.log("creatingDomainConfigurationDE:" + member_id);
//     console.log("creatingDomainConfigurationDE:" + soap_instance_url);
//     console.log("creatingDomainConfigurationDE:" + refreshToken);
//     Utils.logInfo("creatingDomainConfigurationDE:" + FolderID);
//     console.log("creatingDomainConfigurationDE:" + tssd);

//     //console.log('domainConfigurationDECheck:'+req.body.ParentFolderID);

//     let refreshTokenbody = "";
//     this.getRefreshTokenHelper(refreshToken, tssd, false, res)
//       .then((response) => {
//         Utils.logInfo(
//           "creatingDomainConfigurationDE:" +
//             JSON.stringify(response.refreshToken)
//         );
//         Utils.logInfo(
//           "creatingDomainConfigurationDE:" + JSON.stringify(response.oauthToken)
//         );
//         refreshTokenbody = response.refreshToken;
//         Utils.logInfo(
//           "creatingDomainConfigurationDE1:" + JSON.stringify(refreshTokenbody)
//         );

//         let DCmsg =
//           '<?xml version="1.0" encoding="UTF-8"?>' +
//           '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' +
//           "    <s:Header>" +
//           '        <a:Action s:mustUnderstand="1">Create</a:Action>' +
//           '        <a:To s:mustUnderstand="1">' +
//           soap_instance_url +
//           "Service.asmx" +
//           "</a:To>" +
//           '        <fueloauth xmlns="http://exacttarget.com">' +
//           response.oauthToken +
//           "</fueloauth>" +
//           "    </s:Header>" +
//           '    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
//           '        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
//           '            <Objects xsi:type="DataExtension">' +
//           "                <CategoryID>" +
//           FolderID +
//           "</CategoryID>" +
//           "                <CustomerKey>Domain Configuration-" +
//           member_id +
//           "</CustomerKey>" +
//           "                <Name>Domain Configuration-" +
//           member_id +
//           "</Name>" +
//           "                <Fields>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Domain ID</CustomerKey>" +
//           "                        <Name>Domain ID</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>50</MaxLength>" +
//           "                        <IsRequired>true</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Domain Name</CustomerKey>" +
//           "                        <Name>Domain Name</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>100</MaxLength>" +
//           "                        <IsRequired>true</IsRequired>" +
//           "                        <IsPrimaryKey>true</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Inbox Threshold</CustomerKey>" +
//           "                        <Name>Inbox Threshold</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>100</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Engagement Threshold</CustomerKey>" +
//           "                        <Name>Engagement Threshold</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>100</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>SPF Threshold</CustomerKey>" +
//           "                        <Name>SPF Threshold</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>100</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>DKIM Threshold</CustomerKey>" +
//           "                        <Name>DKIM Threshold</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>100</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Campaign Min</CustomerKey>" +
//           "                        <Name>Campaign Min</Name>" +
//           "                        <FieldType>Decimal</FieldType>" +
//           "                        <Precision>18</Precision>" +
//           "                          <Scale>0</Scale>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Intelliseed Lists</CustomerKey>" +
//           "                        <Name>Intelliseed Lists</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>250</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Threshold Recipe</CustomerKey>" +
//           "                        <Name>Threshold Recipe</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>250</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Rules Recipe</CustomerKey>" +
//           "                        <Name>Rules Recipe</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <MaxLength>250</MaxLength>" +
//           "                        <IsRequired>false</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Created or Modified by</CustomerKey>" +
//           "                        <Name>Created or Modified by</Name>" +
//           "                        <FieldType>Text</FieldType>" +
//           "                        <IsRequired>true</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                    <Field>" +
//           "                        <CustomerKey>Created or Modified date</CustomerKey>" +
//           "                        <Name>Created or Modified date</Name>" +
//           "                        <FieldType>Date</FieldType>" +
//           "						  <DefaultValue>getdate()</DefaultValue>" +
//           "                        <IsRequired>true</IsRequired>" +
//           "                        <IsPrimaryKey>false</IsPrimaryKey>" +
//           "                    </Field>" +
//           "                </Fields>" +
//           "            </Objects>" +
//           "        </CreateRequest>" +
//           "    </s:Body>" +
//           "</s:Envelope>";

//         return new Promise<any>((resolve, reject) => {
//           let headers = {
//             "Content-Type": "text/xml",
//           };

//           axios({
//             method: "post",
//             url: "" + soap_instance_url + "Service.asmx" + "",
//             data: DCmsg,
//             headers: headers,
//           })
//             .then((response: any) => {
//               var parser = new xml2js.Parser();
//               parser.parseString(
//                 response.data,
//                 (
//                   err: any,
//                   result: {
//                     [x: string]: {
//                       [x: string]: { [x: string]: { [x: string]: any }[] }[];
//                     };
//                   }
//                 ) => {
//                   let DomainConfiguration =
//                     result["soap:Envelope"]["soap:Body"][0][
//                       "CreateResponse"
//                     ][0]["Results"];

//                   if (DomainConfiguration != undefined) {
//                     let DEexternalKeyDomainConfiguration =
//                       DomainConfiguration[0]["Object"][0]["CustomerKey"];

//                     //this.DEexternalKeyDomainConfiguration =
//                     // DomainConfiguration[0]["Object"][0]["CustomerKey"];
//                     let sendresponse = {};
//                     sendresponse = {
//                       refreshToken: refreshTokenbody,
//                       statusText:
//                         "Domain Configuration Data extension has been created Successfully",
//                       soap_instance_url: soap_instance_url,
//                       member_id: member_id,
//                       DEexternalKeyDomainConfiguration:
//                         DEexternalKeyDomainConfiguration,
//                     };
//                     res.status(200).send(sendresponse);

//                     /*  res
//                   .status(200)
//                   .send(
//                     "Domain Configuration Data extension has been created Successfully"
//                   );*/
//                   }
//                 }
//               );
//             })
//             .catch((error: any) => {
//               // error
//               let errorMsg =
//                 "Error creating the Domain Configuration Data extension......";
//               errorMsg += "\nMessage: " + error.message;
//               errorMsg +=
//                 "\nStatus: " + error.response
//                   ? error.response.status
//                   : "<None>";
//               errorMsg +=
//                 "\nResponse data: " + error.response.data
//                   ? Utils.prettyPrintJson(JSON.stringify(error.response.data))
//                   : "<None>";
//               Utils.logError(errorMsg);

//               reject(errorMsg);
//             });
//         });
//       })
//       .catch((error: any) => {
//         res
//           .status(500)
//           .send(Utils.prettyPrintJson(JSON.stringify(error.response.data)));
//       });
//   }

// {
//     // console.log("OauthToken in creating folder :",token)
//         let createFolderData =
//           '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
//           "<soapenv:Header>" +
//           "<fueloauth>" +
//           token +
//           "</fueloauth>" +
//           "</soapenv:Header>" +
//           "<soapenv:Body>" +
//           '<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
//           "<Options/>" +
//           '<ns1:Objects xmlns:ns1="http://exacttarget.com/wsdl/partnerAPI" xsi:type="ns1:DataFolder">' +
//           '<ns1:ModifiedDate xsi:nil="true"/>' +
//           '<ns1:ObjectID xsi:nil="true"/>' +
//           "<ns1:CustomerKey>LibraryCreated-" +
//           member_id +
//           "</ns1:CustomerKey>" +
//           "<ns1:ParentFolder>" +
//           '<ns1:ModifiedDate xsi:nil="true"/>' +
//           "<ns1:ID>" +
//           ParentFolderID +
//           "</ns1:ID>" +
//           '<ns1:ObjectID xsi:nil="true"/>' +
//           "</ns1:ParentFolder>" +
//           "<ns1:Name>LibraryCreated-" +
//           member_id +
//           "</ns1:Name>" +
//           "<ns1:Description>LibraryCreated-" +
//           member_id +
//           " Folder</ns1:Description>" +
//           "<ns1:ContentType>dataextension</ns1:ContentType>" +
//           "<ns1:IsActive>true</ns1:IsActive>" +
//           "<ns1:IsEditable>true</ns1:IsEditable>" +
//           "<ns1:AllowChildren>true</ns1:AllowChildren>" +
//           "</ns1:Objects>" +
//           "</CreateRequest>" +
//           "</soapenv:Body>" +
//           "</soapenv:Envelope>";
//         return new Promise<any>((resolve, reject) => {
//           let headers = {
//             "Content-Type": "text/xml",
//             SOAPAction: "Create",
//           };
//           // console.log("Headers in Creating Folder",JSON.stringify(headers));
//           // console.log("Create folder data:",createFolderData);
//           // console.log("Soap in creating:",soap_instance_url)
//           // POST to Marketing Cloud Data Extension endpoint to load sample data in the POST body
//           axios({
//             method: "post",
//             url: "" + soap_instance_url + "Service.asmx" + "",
//             data: createFolderData,
//             headers: headers,
//           })
//             .then((response: any) => {
//               let sendresponse = {};
//               // console.log("Response after axios");
//               // console.log("Response in creating folder",response.data)
//               var parser = new xml2js.Parser();
//               parser.parseString(
//                 response.data,
//                 (
//                   err: any,
//                   result: {
//                     [x: string]: {
//                       [x: string]: { [x: string]: { [x: string]: any }[] }[];
//                     };
//                   }
//                 ) => {
//                   let FolderID =
//                     result["soap:Envelope"]["soap:Body"][0][
//                     "CreateResponse"
//                     ][0]["Results"][0]["NewID"][0];
//                   if (FolderID != undefined) {
//                     sendresponse = {
//                      // refreshToken: refreshTokenbody,
//                       statusText: true,
//                       soap_instance_url: soap_instance_url,
//                       member_id:member_id,
//                       FolderID: FolderID,
//                     };
//                     resolve(sendresponse)
//                     //res.status(200).send(sendresponse);
//                   } else {
//                     sendresponse = {
//                      // refreshToken: refreshTokenbody,
//                       statusText: false,
//                       soap_instance_url: soap_instance_url,
//                       member_id: member_id,
//                       FolderID: FolderID,
//                     };
//                     resolve(sendresponse);
//                   }
//                 }
//               );
//             })
//             .catch((error: any) => {
//               // error
//               let errorMsg =
//                 "Error creating the folder......";
//               errorMsg += "\nMessage: " + error.message;
//               errorMsg +=
//                 "\nStatus: " + error.response
//                   ? error.response.status
//                   : "<None>";
//               errorMsg +=
//                 "\nResponse data: " + error.response.data
//                   ? //Utils.prettyPrintJson
//                   JSON.stringify(error.response.data)
//                   : "<None>";
//              // Utils.logError(errorMsg);
//               reject(errorMsg);
//             });
//         });
//       }





// public createSparkpostIntegrationFolder(
//     req: express.Request,
//     res: express.Response
//   ) {
//     // this.getRefreshTokenHelper(this._accessToken, res);
//     console.log("createSparkpostIntegrationFolder:" + req.body.memberid);
//     console.log("createSparkpostIntegrationFolder:" + req.body.soapInstance);
//     console.log("createSparkpostIntegrationFolder:" + req.body.refreshToken);
//     console.log("createSparkpostIntegrationFolder:" + req.body.ParentFolderID);

//     let refreshTokenbody = "";
//     //this.getRefreshTokenHelper(this._accessToken, res);
//     // this.getRefreshTokenHelper(req.body.refreshToken, req.body.tssd, false, res)
     
//     let oauthToken=req.body.accessToken;
   
//         let createFolderData =
//         '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
//         "<soapenv:Header>" +
//         "<fueloauth>" +
//          oauthToken +
//         "</fueloauth>" +
//         "</soapenv:Header>" +
//         "<soapenv:Body>" +
//         '<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">' +
//         "<Options/>" +
//         '<ns1:Objects xmlns:ns1="http://exacttarget.com/wsdl/partnerAPI" xsi:type="ns1:DataFolder">' +
//         '<ns1:ModifiedDate xsi:nil="true"/>' +
//         '<ns1:ObjectID xsi:nil="true"/>' +
//         "<ns1:CustomerKey>mcapp44 - " +
//          this.member_id +
//         "</ns1:CustomerKey>" +
//         "<ns1:ParentFolder>" +
//         '<ns1:ModifiedDate xsi:nil="true"/>' +
//         "<ns1:ID> 12785" +
         
//         "</ns1:ID>" +
//         '<ns1:ObjectID xsi:nil="true"/>' +
//         "</ns1:ParentFolder>" +
//         "<ns1:Name>mcapp44 - " +
//         this.member_id +
//         "</ns1:Name>" +
//         "<ns1:Description>Smcapp44- " +
//         this.member_id +
//         " Folder</ns1:Description>" +
//         "<ns1:ContentType>dataextension</ns1:ContentType>" +
//         "<ns1:IsActive>true</ns1:IsActive>" +
//         "<ns1:IsEditable>true</ns1:IsEditable>" +
//         "<ns1:AllowChildren>true</ns1:AllowChildren>" +
//         "</ns1:Objects>" +
//         "</CreateRequest>" +
//         "</soapenv:Body>" +
//         "</soapenv:Envelope>";

//         return new Promise<any>((resolve, reject) => {
//           let headers = {
//             "Content-Type": "text/xml",
//             SOAPAction: "Create",
//           };

//           // POST to Marketing Cloud Data Extension endpoint to load sample data in the POST body
//           axios({
//             method: "post",
//             url: "" + this.soap_instance_url + "Service.asmx" + "",
//             data: createFolderData,
//             headers: headers,
//           })
//             .then((response: any) => {
//               let sendresponse = {};

//               var parser = new xml2js.Parser();
//               parser.parseString(
//                 response.data,
//                 (
//                   err: any,
//                   result: {
//                     [x: string]: {
//                       [x: string]: { [x: string]: { [x: string]: any }[] }[];
//                     };
//                   }
//                 ) => {
//                   let SparkpostIntegrationsID =
//                     result["soap:Envelope"]["soap:Body"][0][
//                     "CreateResponse"
//                     ][0]["Results"][0]["NewID"][0];
//                   if (SparkpostIntegrationsID != undefined) {
//                     //  this.FolderID = SparkpostIntegrationsID;

//                     sendresponse = {
//                       refreshToken: refreshTokenbody,
//                       statusText: true,
//                       soap_instance_url: req.body.soapInstance,
//                       member_id: req.body.memberid,
//                       FolderID: SparkpostIntegrationsID,
//                     };
//                     res.status(200).send(sendresponse);
//                   } else {
//                     sendresponse = {
//                       refreshToken: refreshTokenbody,
//                       statusText: false,
//                       soap_instance_url: req.body.soapInstance,
//                       member_id: req.body.memberid,
//                       FolderID: SparkpostIntegrationsID,
//                     };
//                     res.status(200).send(sendresponse);
//                   }
//                 }
                
//               );
//             })
//             .catch((error: any) => {
//               // error
//               let errorMsg =
//                 "Error creating the Sparkpost Integrations folder......";
//               errorMsg += "\nMessage: " + error.message;
//               errorMsg +=
//                 "\nStatus: " + error.response
//                   ? error.response.status
//                   : "<None>";
//               errorMsg +=
//                 "\nResponse data: " + error.response.data
//                   ? Utils.prettyPrintJson(JSON.stringify(error.response.data))
//                   : "<None>";
//               Utils.logError(errorMsg);

//               reject(errorMsg);
//             });
//         });
      
//       // .catch((error: any) => {
//       //   res
//       //     .status(500)
//       //     .send(Utils.prettyPrintJson(JSON.stringify(error.response.data)));
//       // });
//   } 
// white_check_mark
// eyes
// raised_hands











