"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pdfnet_node_1 = require("@pdftron/pdfnet-node");
var fs = require("fs");
var qr = require('qr-image');
pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
var DocumentSign = /** @class */ (function () {
    // ---------------- Preparation --------------------
    // Récuperer le document dont on veut signer
    function DocumentSign(doc, certificate) {
        pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
        this.doc = pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(doc);
        this.certificate = certificate;
        this.timestamp = Date.now();
    }
    DocumentSign.prototype.Sign = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page1, builder, writer, certification_sig_field, widgetAnnot, fields_to_lock, element, _a, _b, _c, _d, _e, _f, options, qr_svg, signatureDate, _g, _h, img, _j, _k, _l, _m, _o, _p;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0: return [4 /*yield*/, pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _q.sent();
                        page1 = this.doc.getPage(1);
                        builder = pdfnet_node_1.PDFNet.ElementBuilder.create();
                        writer = pdfnet_node_1.PDFNet.ElementWriter.create();
                        certification_sig_field = this.doc.createDigitalSignatureField('Certificate');
                        certification_sig_field.setDocumentPermissions(pdfnet_node_1.PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed);
                        widgetAnnot = pdfnet_node_1.PDFNet.SignatureWidget.createWithDigitalSignatureField(this.doc, new pdfnet_node_1.PDFNet.Rect(parseFloat((page1.getPageWidth()).toString()) - 200, parseFloat((page1.getPageHeight()).toString()) - 750, parseFloat((page1.getPageWidth()).toString()) - 30, parseFloat((page1.getPageHeight()).toString()) - 800), certification_sig_field);
                        page1.annotPushBack(widgetAnnot);
                        fields_to_lock = ['asdf_test_field'];
                        certification_sig_field.setFieldPermissions(pdfnet_node_1.PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);
                        certification_sig_field.certifyOnNextSave(this.certificate, 'ahmedahmed');
                        return [4 /*yield*/, 
                            // Ajouter les Permissions à la signature
                            writer];
                    case 2:
                        // Ajouter les Permissions à la signature
                        (_q.sent()).beginOnPage(page1);
                        return [4 /*yield*/, builder];
                    case 3:
                        _b = (_a = (_q.sent())).createTextBeginWithFont;
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.Font.create(this.doc, pdfnet_node_1.PDFNet.Font.StandardType1Font.e_times_roman)];
                    case 4:
                        element = _b.apply(_a, [_q.sent(), 20]);
                        return [4 /*yield*/, writer];
                    case 5:
                        _d = (_c = (_q.sent())).writeElement;
                        return [4 /*yield*/, element];
                    case 6:
                        _d.apply(_c, [_q.sent()]);
                        return [4 /*yield*/, builder];
                    case 7:
                        element = (_q.sent()).createNewTextRun('');
                        return [4 /*yield*/, element];
                    case 8:
                        (_q.sent()).setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((page1.getPageWidth()).toString()) - 190, parseFloat((page1.getPageHeight()).toString()) - 760);
                        return [4 /*yield*/, writer];
                    case 9:
                        _f = (_e = (_q.sent())).writeElement;
                        return [4 /*yield*/, element];
                    case 10:
                        _f.apply(_e, [_q.sent()]);
                        options = {
                            errorCorrectionLevel: 'H',
                            type: 'png',
                            quality: 0.9,
                            margin: 0,
                            color: {
                                dark: "#010599FF",
                                light: "#FFBF60FF"
                            }
                        };
                        qr_svg = qr.imageSync("omar", options);
                        signatureDate = certification_sig_field.getSigningTime();
                        return [4 /*yield*/, builder];
                    case 11:
                        element = (_q.sent()).createNewTextRun('Date: ' + signatureDate.year + '/' + signatureDate.month + '/' + signatureDate.day + ' at ' + signatureDate.hour + ':' + signatureDate.minute + ':' + signatureDate.second);
                        return [4 /*yield*/, 
                            // element.setPosAdjustment(15);
                            element];
                    case 12:
                        // element.setPosAdjustment(15);
                        (_q.sent()).setTextMatrixEntries(0.5, 0, 0, 0.5, parseFloat((page1.getPageWidth()).toString()) - 190, parseFloat((page1.getPageHeight()).toString()) - 775);
                        return [4 /*yield*/, builder];
                    case 13:
                        (_q.sent()).createImage;
                        return [4 /*yield*/, writer];
                    case 14:
                        _h = (_g = (_q.sent())).writeElement;
                        return [4 /*yield*/, element];
                    case 15:
                        _h.apply(_g, [_q.sent()]);
                        fs.writeFileSync('./my-qr-code.png', qr_svg);
                        img = pdfnet_node_1.PDFNet.Image.createFromFile(this.doc, './my-qr-code.png');
                        return [4 /*yield*/, builder];
                    case 16:
                        _k = (_j = (_q.sent())).createImageScaled;
                        return [4 /*yield*/, img];
                    case 17:
                        element = _k.apply(_j, [_q.sent(), 300, 600, 200, -150]);
                        return [4 /*yield*/, writer];
                    case 18:
                        _m = (_l = (_q.sent())).writeElement;
                        return [4 /*yield*/, element];
                    case 19:
                        _m.apply(_l, [_q.sent()]);
                        return [4 /*yield*/, writer];
                    case 20:
                        _p = (_o = (_q.sent())).writeElement;
                        return [4 /*yield*/, builder];
                    case 21: return [4 /*yield*/, (_q.sent()).createTextEnd()];
                    case 22:
                        _p.apply(_o, [_q.sent()]);
                        return [4 /*yield*/, writer];
                    case 23:
                        (_q.sent()).end(); // save changes to the current page
                        this.doc.pageRemove(this.doc.getPageIterator(1));
                        this.doc.pagePushBack(page1);
                        this.doc.save('mm.pdf', pdfnet_node_1.PDFNet.SDFDoc.SaveOptions.e_remove_unused);
                        pdfnet_node_1.PDFNet.runWithCleanup(this.Sign, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
                        return [2 /*return*/];
                }
            });
        });
    };
    // Récuperer la page dont on veut signer
    // creer le builder qui va ajouter des blocks à la page
    ///////////////////////////////
    /////////////////////////////////////////
    DocumentSign.prototype.verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var in_docpath, in_public_key_file_path, doc1, opts, digsig_fitr, verification_status, curr, result, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, changes, i, _q, change, trust_verification_result, _r, _s, tmp_time_t, cert_path, i, _t, full_cert, issuer_dn, j, subject_dn, j, extension_dn, j;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0: return [4 /*yield*/, pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _u.sent();
                        in_docpath = 'mm.pdf';
                        in_public_key_file_path = this.certificate;
                        doc1 = pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(in_docpath);
                        return [4 /*yield*/, doc1];
                    case 2:
                        (_u.sent()).initSecurityHandler();
                        console.log('==========');
                        opts = pdfnet_node_1.PDFNet.VerificationOptions.create(pdfnet_node_1.PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);
                        return [4 /*yield*/, opts];
                    case 3:
                        (_u.sent()).addTrustedCertificateUString(in_public_key_file_path, pdfnet_node_1.PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + pdfnet_node_1.PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust);
                        return [4 /*yield*/, doc1];
                    case 4:
                        digsig_fitr = (_u.sent()).getDigitalSignatureFieldIteratorBegin();
                        console.log(digsig_fitr);
                        verification_status = true;
                        _u.label = 5;
                    case 5: return [4 /*yield*/, digsig_fitr];
                    case 6:
                        if (!(_u.sent()).hasNext()) return [3 /*break*/, 43];
                        return [4 /*yield*/, digsig_fitr];
                    case 7:
                        curr = (_u.sent()).current();
                        return [4 /*yield*/, curr];
                    case 8:
                        _b = (_a = (_u.sent())).verify;
                        return [4 /*yield*/, opts];
                    case 9:
                        result = _b.apply(_a, [_u.sent()]);
                        return [4 /*yield*/, result];
                    case 10: return [4 /*yield*/, (_u.sent()).getVerificationStatus()];
                    case 11:
                        if (!_u.sent()) return [3 /*break*/, 14];
                        _d = (_c = console).log;
                        _e = 'Signature verified, objnum: ';
                        return [4 /*yield*/, curr];
                    case 12: return [4 /*yield*/, ((_u.sent()).getSDFObj())];
                    case 13:
                        _d.apply(_c, [_e + (_u.sent()).getObjNum()]);
                        return [3 /*break*/, 17];
                    case 14:
                        _g = (_f = console).log;
                        _h = 'Signature verification failed, objnum: ';
                        return [4 /*yield*/, curr];
                    case 15: return [4 /*yield*/, ((_u.sent()).getSDFObj())];
                    case 16:
                        _g.apply(_f, [_h + (_u.sent()).getObjNum()]);
                        verification_status = false;
                        _u.label = 17;
                    case 17: return [4 /*yield*/, result];
                    case 18: return [4 /*yield*/, (_u.sent()).getDigestAlgorithm()];
                    case 19:
                        switch (_u.sent()) {
                            case pdfnet_node_1.PDFNet.DigestAlgorithm.Type.e_SHA1:
                                console.log('Digest algorithm: SHA-1');
                                break;
                            case pdfnet_node_1.PDFNet.DigestAlgorithm.Type.e_SHA256:
                                console.log('Digest algorithm: SHA-256');
                                break;
                            case pdfnet_node_1.PDFNet.DigestAlgorithm.Type.e_SHA384:
                                console.log('Digest algorithm: SHA-384');
                                break;
                            case pdfnet_node_1.PDFNet.DigestAlgorithm.Type.e_SHA512:
                                console.log('Digest algorithm: SHA-512');
                                break;
                            case pdfnet_node_1.PDFNet.DigestAlgorithm.Type.e_RIPEMD160:
                                console.log('Digest algorithm: RIPEMD-160');
                                break;
                            case pdfnet_node_1.PDFNet.DigestAlgorithm.Type.e_unknown_digest_algorithm:
                                console.log('Digest algorithm: unknown');
                                break;
                        }
                        _k = (_j = console).log;
                        _l = 'Detailed verification result: \n\t';
                        return [4 /*yield*/, result];
                    case 20:
                        _m = _l +
                            (_u.sent()).getDocumentStatusAsString() + '\n\t';
                        return [4 /*yield*/, result];
                    case 21:
                        _o = _m +
                            (_u.sent()).getDigestStatusAsString() + '\n\t';
                        return [4 /*yield*/, result];
                    case 22:
                        _p = _o +
                            (_u.sent()).getTrustStatusAsString() + '\n\t';
                        return [4 /*yield*/, result];
                    case 23:
                        _k.apply(_j, [_p +
                                (_u.sent()).getPermissionsStatusAsString()]);
                        return [4 /*yield*/, result];
                    case 24:
                        changes = (_u.sent()).getDisallowedChanges();
                        i = 0;
                        _u.label = 25;
                    case 25:
                        _q = i;
                        return [4 /*yield*/, changes];
                    case 26:
                        if (!(_q < (_u.sent()).length)) return [3 /*break*/, 28];
                        change = changes[i];
                        console.log('\tDisallowed change: ' + change.getTypeAsString() + ', objnum: ' + change.getObjNum());
                        _u.label = 27;
                    case 27:
                        ++i;
                        return [3 /*break*/, 25];
                    case 28: return [4 /*yield*/, result];
                    case 29: return [4 /*yield*/, (_u.sent()).hasTrustVerificationResult()];
                    case 30:
                        if (!_u.sent()) return [3 /*break*/, 40];
                        return [4 /*yield*/, result];
                    case 31: return [4 /*yield*/, (_u.sent()).getTrustVerificationResult()];
                    case 32:
                        trust_verification_result = _u.sent();
                        _s = (_r = console).log;
                        return [4 /*yield*/, trust_verification_result.wasSuccessful()];
                    case 33:
                        _s.apply(_r, [(_u.sent()) ? 'Trust verified.' : 'Trust not verifiable.']);
                        console.log(trust_verification_result.getResultString());
                        tmp_time_t = trust_verification_result.getTimeOfTrustVerification();
                        return [4 /*yield*/, trust_verification_result.getTimeOfTrustVerificationEnum()];
                    case 34:
                        switch (_u.sent()) {
                            case pdfnet_node_1.PDFNet.VerificationOptions.TimeMode.e_current:
                                console.log('Trust verification attempted with respect to current time (as epoch time):' + tmp_time_t);
                                break;
                            case pdfnet_node_1.PDFNet.VerificationOptions.TimeMode.e_signing:
                                console.log('Trust verification attempted with respect to signing time (as epoch time): ' + tmp_time_t);
                                break;
                            case pdfnet_node_1.PDFNet.VerificationOptions.TimeMode.e_timestamp:
                                console.log('Trust verification attempted with respect to secure embedded timestamp (as epoch time): ' + tmp_time_t);
                                break;
                        }
                        cert_path = trust_verification_result.getCertPath();
                        return [4 /*yield*/, cert_path];
                    case 35:
                        if (!((_u.sent()).length == 0)) return [3 /*break*/, 36];
                        console.log('Could not print certificate path.');
                        return [3 /*break*/, 40];
                    case 36:
                        console.log('Certificate path:');
                        i = 0;
                        _u.label = 37;
                    case 37:
                        _t = i;
                        return [4 /*yield*/, cert_path];
                    case 38:
                        if (!(_t < (_u.sent()).length)) return [3 /*break*/, 40];
                        console.log('\tCertificate:');
                        full_cert = cert_path[i];
                        console.log('\t\tIssuer names:');
                        issuer_dn = (full_cert.getIssuerField()).getAllAttributesAndValues();
                        for (j = 0; j < issuer_dn.length; j++) {
                            console.log('\t\t\t' + issuer_dn[j].getStringValue());
                        }
                        console.log('\t\tSubject names:');
                        subject_dn = (full_cert.getSubjectField()).getAllAttributesAndValues();
                        for (j = 0; j < subject_dn.length; j++) {
                            console.log('\t\t\t' + subject_dn[j].getStringValue());
                        }
                        console.log('\t\tExtensions:');
                        extension_dn = full_cert.getExtensions();
                        for (j = 0; j < extension_dn.length; j++) {
                            console.log('\t\t\t' + extension_dn[j].toString());
                        }
                        _u.label = 39;
                    case 39:
                        i++;
                        return [3 /*break*/, 37];
                    case 40:
                        console.log(result);
                        _u.label = 41;
                    case 41: return [4 /*yield*/, digsig_fitr];
                    case 42:
                        (_u.sent()).next();
                        return [3 /*break*/, 5];
                    case 43:
                        pdfnet_node_1.PDFNet.runWithCleanup(this.verify, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
                        return [2 /*return*/];
                }
            });
        });
    };
    return DocumentSign;
}());
pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
var a = new DocumentSign('CV.pdf', 'certificatea.pfx');
a.Sign();
