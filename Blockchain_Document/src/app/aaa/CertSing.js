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
var process_1 = require("process");
var qr = require('qr-image');
var DocumentSign = /** @class */ (function () {
    // ---------------- Preparation --------------------
    // Récuperer le document dont on veut signer
    function DocumentSign(docpath, certificate) {
        this.docpath = docpath;
        this.certificate = certificate;
        this.timestamp = Date.now();
    }
    DocumentSign.prototype.Sign = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doc, page1, builder, writer, certification_sig_field, widgetAnnot, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, fields_to_lock, element, _l, _m, _o, _p, _q, _r, _s, options, qr_svg, signatureDate, _t, _u, _v, _w, _x, img, _y, _z, _0, _1, err_1;
            return __generator(this, function (_2) {
                switch (_2.label) {
                    case 0:
                        _2.trys.push([0, 42, , 43]);
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _2.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(this.docpath)];
                    case 2:
                        doc = _2.sent();
                        return [4 /*yield*/, doc.getPage(1)];
                    case 3:
                        page1 = _2.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.ElementBuilder.create()];
                    case 4:
                        builder = _2.sent();
                        console.log('builder' + builder);
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.ElementWriter.create()];
                    case 5:
                        writer = _2.sent();
                        console.log('writer' + writer);
                        return [4 /*yield*/, doc.createDigitalSignatureField('Certificate')];
                    case 6:
                        certification_sig_field = _2.sent();
                        console.log('field' + certification_sig_field);
                        return [4 /*yield*/, certification_sig_field.setDocumentPermissions(pdfnet_node_1.PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed)];
                    case 7:
                        _2.sent();
                        _b = (_a = pdfnet_node_1.PDFNet.SignatureWidget).createWithDigitalSignatureField;
                        _c = [doc];
                        _e = (_d = pdfnet_node_1.PDFNet.Rect).bind;
                        _f = parseFloat;
                        return [4 /*yield*/, page1.getPageWidth()];
                    case 8:
                        _g = [void 0, _f.apply(void 0, [(_2.sent()).toString()]) - 200];
                        _h = parseFloat;
                        return [4 /*yield*/, page1.getPageHeight()];
                    case 9:
                        _g = _g.concat([_h.apply(void 0, [(_2.sent()).toString()]) - 750]);
                        _j = parseFloat;
                        return [4 /*yield*/, page1.getPageWidth()];
                    case 10:
                        _g = _g.concat([_j.apply(void 0, [(_2.sent()).toString()]) - 30]);
                        _k = parseFloat;
                        return [4 /*yield*/, page1.getPageHeight()];
                    case 11: return [4 /*yield*/, _b.apply(_a, _c.concat([new (_e.apply(_d, _g.concat([_k.apply(void 0, [(_2.sent()).toString()]) - 800])))(), certification_sig_field]))];
                    case 12:
                        widgetAnnot = _2.sent();
                        console.log('widg' + widgetAnnot);
                        return [4 /*yield*/, page1.annotPushBack(widgetAnnot)];
                    case 13:
                        _2.sent();
                        fields_to_lock = ['asdf_test_field'];
                        console.log('fdlock' + fields_to_lock);
                        return [4 /*yield*/, certification_sig_field.setFieldPermissions(pdfnet_node_1.PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock)];
                    case 14:
                        _2.sent();
                        return [4 /*yield*/, certification_sig_field.certifyOnNextSave(this.certificate, 'ahmedahmed')];
                    case 15:
                        _2.sent();
                        // Ajouter les Permissions à la signature
                        return [4 /*yield*/, writer.beginOnPage(page1)];
                    case 16:
                        // Ajouter les Permissions à la signature
                        _2.sent();
                        console.log('doc' + doc);
                        console.log('page' + page1);
                        _m = (_l = builder).createTextBeginWithFont;
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.Font.create(doc, pdfnet_node_1.PDFNet.Font.StandardType1Font.e_times_roman)];
                    case 17: return [4 /*yield*/, _m.apply(_l, [_2.sent(), 20])];
                    case 18:
                        element = _2.sent();
                        return [4 /*yield*/, writer.writeElement(element)];
                    case 19:
                        _2.sent();
                        return [4 /*yield*/, builder.createNewTextRun('')];
                    case 20:
                        element = _2.sent();
                        _p = (_o = element).setTextMatrixEntries;
                        _q = [0.5, 0, 0, 0.5];
                        _r = parseFloat;
                        return [4 /*yield*/, page1];
                    case 21:
                        _q = _q.concat([_r.apply(void 0, [((_2.sent()).getPageWidth()).toString()]) - 190]);
                        _s = parseFloat;
                        return [4 /*yield*/, page1];
                    case 22: return [4 /*yield*/, _p.apply(_o, _q.concat([_s.apply(void 0, [((_2.sent()).getPageHeight()).toString()]) - 760]))];
                    case 23:
                        _2.sent();
                        return [4 /*yield*/, writer.writeElement(element)];
                    case 24:
                        _2.sent();
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
                        return [4 /*yield*/, qr.imageSync("omar", options)];
                    case 25:
                        qr_svg = _2.sent();
                        return [4 /*yield*/, certification_sig_field.getSigningTime()];
                    case 26:
                        signatureDate = _2.sent();
                        return [4 /*yield*/, builder.createNewTextRun("Date: ".concat((signatureDate).year, "/").concat((signatureDate).month, "/").concat((signatureDate).day, " at ").concat((signatureDate).hour, ":").concat((signatureDate).minute, ":").concat((signatureDate).second))];
                    case 27:
                        element = _2.sent();
                        _u = (_t = element).setTextMatrixEntries;
                        _v = [0.5, 0, 0, 0.5];
                        _w = parseFloat;
                        return [4 /*yield*/, page1.getPageWidth()];
                    case 28:
                        _v = _v.concat([_w.apply(void 0, [(_2.sent()).toString()]) - 190]);
                        _x = parseFloat;
                        return [4 /*yield*/, page1.getPageHeight()];
                    case 29: 
                    // element.setPosAdjustment(15);
                    return [4 /*yield*/, _u.apply(_t, _v.concat([_x.apply(void 0, [(_2.sent()).toString()]) - 775]))];
                    case 30:
                        // element.setPosAdjustment(15);
                        _2.sent();
                        return [4 /*yield*/, writer.writeElement(element)];
                    case 31:
                        _2.sent();
                        console.log(this.certificate);
                        fs.writeFileSync('my-qr-code.png', qr_svg);
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.Image.createFromFile(doc, 'my-qr-code.png')];
                    case 32:
                        img = _2.sent();
                        return [4 /*yield*/, builder.createImageScaled(img, 300, 600, 200, -150)];
                    case 33:
                        element = _2.sent();
                        return [4 /*yield*/, writer.writeElement(element)];
                    case 34:
                        _2.sent();
                        _z = (_y = writer).writeElement;
                        return [4 /*yield*/, builder.createTextEnd()];
                    case 35: return [4 /*yield*/, _z.apply(_y, [_2.sent()])];
                    case 36:
                        _2.sent();
                        console.log(this.certificate);
                        return [4 /*yield*/, writer.end()];
                    case 37:
                        _2.sent(); // save changes to the current page
                        _1 = (_0 = doc).pageRemove;
                        return [4 /*yield*/, doc.getPageIterator(1)];
                    case 38: // save changes to the current page
                    return [4 /*yield*/, _1.apply(_0, [_2.sent()])];
                    case 39:
                        _2.sent();
                        return [4 /*yield*/, doc.pagePushBack(page1)];
                    case 40:
                        _2.sent();
                        return [4 /*yield*/, doc.save('src/app/aaa/mm.pdf', pdfnet_node_1.PDFNet.SDFDoc.SaveOptions.e_remove_unused)];
                    case 41:
                        _2.sent();
                        (0, process_1.exit)(1);
                        return [3 /*break*/, 43];
                    case 42:
                        err_1 = _2.sent();
                        console.log('error', err_1);
                        return [3 /*break*/, 43];
                    case 43: return [2 /*return*/];
                }
            });
        });
    };
    // Récuperer la page dont on veut signer
    // creer le builder qui va ajouter des blocks à la page
    ///////////////////////////////
    ///////////////////////////////////////
    DocumentSign.prototype.verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, in_docpath, in_public_key_file_path, doc1, opts, digsig_fitr, verification_status, curr, result, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, changes, i, change, err_2;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _m.trys.push([0, 28, , 29]);
                        isValid = void 0;
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _m.sent();
                        in_docpath = 'CV.pdf';
                        in_public_key_file_path = this.certificate;
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(in_docpath)];
                    case 2:
                        doc1 = _m.sent();
                        doc1.initSecurityHandler();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.VerificationOptions.create(pdfnet_node_1.PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving)];
                    case 3:
                        opts = _m.sent();
                        return [4 /*yield*/, opts.addTrustedCertificateUString(in_public_key_file_path, pdfnet_node_1.PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + pdfnet_node_1.PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust)];
                    case 4:
                        _m.sent();
                        digsig_fitr = doc1.getDigitalSignatureFieldIteratorBegin();
                        console.log(digsig_fitr);
                        verification_status = true;
                        _m.label = 5;
                    case 5: return [4 /*yield*/, digsig_fitr];
                    case 6: return [4 /*yield*/, (_m.sent()).hasNext()];
                    case 7:
                        if (!_m.sent()) return [3 /*break*/, 27];
                        return [4 /*yield*/, digsig_fitr];
                    case 8: return [4 /*yield*/, (_m.sent()).current()];
                    case 9:
                        curr = _m.sent();
                        return [4 /*yield*/, curr.verify(opts)];
                    case 10:
                        result = _m.sent();
                        return [4 /*yield*/, result.getVerificationStatus()];
                    case 11:
                        if (!_m.sent()) return [3 /*break*/, 14];
                        _b = (_a = console).log;
                        _c = 'Signature verified, objnum: ';
                        return [4 /*yield*/, curr.getSDFObj()];
                    case 12: return [4 /*yield*/, (_m.sent()).getObjNum()];
                    case 13:
                        _b.apply(_a, [_c + (_m.sent())]);
                        return [3 /*break*/, 17];
                    case 14:
                        _e = (_d = console).log;
                        _f = 'Signature verification failed, objnum: ';
                        return [4 /*yield*/, curr.getSDFObj()];
                    case 15: return [4 /*yield*/, (_m.sent()).getObjNum()];
                    case 16:
                        _e.apply(_d, [_f + (_m.sent())]);
                        verification_status = false;
                        _m.label = 17;
                    case 17: return [4 /*yield*/, result.hasTrustVerificationResult()];
                    case 18:
                        if (!_m.sent()) return [3 /*break*/, 22];
                        _h = (_g = console).log;
                        _j = 'Detailed verification result: \n\t';
                        return [4 /*yield*/, result.getDocumentStatusAsString()];
                    case 19:
                        _k = _j +
                            (_m.sent()) + '\n\t';
                        return [4 /*yield*/, result.getDigestStatusAsString()];
                    case 20:
                        _l = _k +
                            (_m.sent()) + '\n\t';
                        return [4 /*yield*/, result.getPermissionsStatusAsString()];
                    case 21:
                        _h.apply(_g, [_l +
                                (_m.sent())]);
                        _m.label = 22;
                    case 22: return [4 /*yield*/, result.getDisallowedChanges()];
                    case 23:
                        changes = _m.sent();
                        for (i = 0; i < changes.length; ++i) {
                            change = changes[i];
                            console.log('\tDisallowed change: ' + change.getTypeAsString() + ', objnum: ' + change.getObjNum());
                        }
                        // Get and print all the detailed trust-related results, if they are available.
                        // if (await result.hasTrustVerificationResult()) {
                        //     let trust_verification_result = await  result.getTrustVerificationResult();
                        //     console.log(await trust_verification_result.wasSuccessful() ? 'Trust verified.' : 'Trust not verifiable.');
                        //     console.log(await trust_verification_result.getResultString());
                        //     let tmp_time_t = await trust_verification_result.getTimeOfTrustVerification();
                        //     switch (await trust_verification_result.getTimeOfTrustVerificationEnum()) {
                        //         case PDFNet.VerificationOptions.TimeMode.e_current:
                        //             console.log('Trust verification attempted with respect to current time (as epoch time):' + tmp_time_t);
                        //             break;
                        //         case PDFNet.VerificationOptions.TimeMode.e_signing:
                        //             console.log('Trust verification attempted with respect to signing time (as epoch time): ' + tmp_time_t);
                        //             break;
                        //         case PDFNet.VerificationOptions.TimeMode.e_timestamp:
                        //             console.log('Trust verification attempted with respect to secure embedded timestamp (as epoch time): ' + tmp_time_t);
                        //             break;
                        //     }
                        // let cert_path = await trust_verification_result.getCertPath();
                        // if (cert_path.length == 0) {
                        //     console.log('Could not print certificate path.');
                        // } else {
                        //     console.log('Certificate path:');
                        //     for (var i = 0; i < cert_path.length; i++) {
                        //         console.log('\tCertificate:');
                        //         let full_cert = cert_path[i];
                        //         console.log('\t\tIssuer names:');
                        //         let issuer_dn = await (await full_cert.getIssuerField()).getAllAttributesAndValues();
                        //         for (var j = 0; j < issuer_dn.length; j++) {
                        //             console.log('\t\t\t' + issuer_dn[j].getStringValue());
                        //         }
                        //         console.log('\t\tSubject names:');
                        //         let subject_dn = await (await full_cert.getSubjectField()).getAllAttributesAndValues();
                        //         for (var j = 0; j < subject_dn.length; j++) {
                        //             console.log('\t\t\t' + await subject_dn[j].getStringValue());
                        //         }
                        //         console.log('\t\tExtensions:');
                        //         let extension_dn = await full_cert.getExtensions();
                        //         for (var j = 0; j < extension_dn.length; j++) {
                        //             console.log('\t\t\t' + await extension_dn[j].toString());
                        //         }
                        //     }
                        // }
                        console.log(result);
                        _m.label = 24;
                    case 24: return [4 /*yield*/, digsig_fitr];
                    case 25: return [4 /*yield*/, (_m.sent()).next()];
                    case 26:
                        _m.sent();
                        return [3 /*break*/, 5];
                    case 27:
                        (0, process_1.exit)(1);
                        return [3 /*break*/, 29];
                    case 28:
                        err_2 = _m.sent();
                        console.log('error', err_2);
                        return [3 /*break*/, 29];
                    case 29: return [2 /*return*/];
                }
            });
        });
    };
    return DocumentSign;
}());
var a = new DocumentSign('./CV.pdf', './certificatea.pfx');
a.Sign();
a.verify();
