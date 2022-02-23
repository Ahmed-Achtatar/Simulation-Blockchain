"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
        f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

    function verb(n) { return function(v) { return step([n, v]); }; }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return { value: op[1], done: false };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally { f = t = 0; }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pdfnet_node_1 = require("@pdftron/pdfnet-node");
var fs = require("fs");
var qr = require('qr-image');
pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
var DocumentSign = /** @class */ (function() {
    // ---------------- Preparation --------------------
    // Récuperer le document dont on veut signer
    function DocumentSign(docpath, certificate) {
        this.docpath = docpath;
        this.certificate = certificate;
        this.timestamp = Date.now();
    }
    DocumentSign.prototype.Sign = function() {
        return __awaiter(this, void 0, void 0, function() {
            var doc, page1, builder, writer, certification_sig_field, widgetAnnot, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, fields_to_lock, _l, _m, element, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, options, qr_svg, signatureDate, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, img, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28;
            return __generator(this, function(_29) {
                switch (_29.label) {
                    case 0:
                        return [4 /*yield*/ , pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _29.sent();
                        return [4 /*yield*/ , pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(this.docpath)];
                    case 2:
                        doc = _29.sent();
                        page1 = doc.getPage(1);
                        builder = pdfnet_node_1.PDFNet.ElementBuilder.create();
                        writer = pdfnet_node_1.PDFNet.ElementWriter.create();
                        return [4 /*yield*/ , doc.createDigitalSignatureField('Certificate')];
                    case 3:
                        yield certification_sig_field;
                        certification_sig_field = _29.sent();
                        return [4 /*yield*/ , certification_sig_field.setDocumentPermissions(parseInt(pdfnet_node_1.PDFNet.DigitalSignatureField.DocumentPermissions.e_annotating_formfilling_signing_allowed.toString()))];
                    case 4:
                        _29.sent();
                        _b = (_a = pdfnet_node_1.PDFNet.SignatureWidget).createWithDigitalSignatureField;
                        _c = [doc];
                        _e = (_d = pdfnet_node_1.PDFNet.Rect).bind;
                        _f = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 5:
                        _g = [void 0, _f.apply(void 0, [((_29.sent()).getPageWidth()).toString()]) - 200];
                        _h = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 6:
                        _g = _g.concat([_h.apply(void 0, [((_29.sent()).getPageHeight()).toString()]) - 750]);
                        _j = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 7:
                        _g = _g.concat([_j.apply(void 0, [((_29.sent()).getPageWidth()).toString()]) - 30]);
                        _k = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 8:
                        return [4 /*yield*/ , _b.apply(_a, _c.concat([new(_e.apply(_d, _g.concat([_k.apply(void 0, [((_29.sent()).getPageHeight()).toString()]) - 800])))(), certification_sig_field]))];
                    case 9:
                        widgetAnnot = _29.sent();
                        return [4 /*yield*/ , page1];
                    case 10:
                        (_29.sent()).annotPushBack(widgetAnnot);
                        fields_to_lock = ['asdf_test_field'];
                        certification_sig_field.setFieldPermissions(pdfnet_node_1.PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock);
                        certification_sig_field.certifyOnNextSave(this.certificate, 'ahmedahmed');
                        return [4 /*yield*/ ,
                            // Ajouter les Permissions à la signature
                            writer
                        ];
                    case 11:
                        // Ajouter les Permissions à la signature
                        _m = (_l = (_29.sent())).beginOnPage;
                        return [4 /*yield*/ , page1];
                    case 12:
                        // Ajouter les Permissions à la signature
                        _m.apply(_l, [_29.sent()]);
                        return [4 /*yield*/ , builder];
                    case 13:
                        _p = (_o = (_29.sent())).createTextBeginWithFont;
                        return [4 /*yield*/ , pdfnet_node_1.PDFNet.Font.create(doc, pdfnet_node_1.PDFNet.Font.StandardType1Font.e_times_roman)];
                    case 14:
                        element = _p.apply(_o, [_29.sent(), 20]);
                        return [4 /*yield*/ , writer];
                    case 15:
                        _r = (_q = (_29.sent())).writeElement;
                        return [4 /*yield*/ , element];
                    case 16:
                        _r.apply(_q, [_29.sent()]);
                        return [4 /*yield*/ , builder];
                    case 17:
                        element = (_29.sent()).createNewTextRun('');
                        return [4 /*yield*/ , element];
                    case 18:
                        _t = (_s = (_29.sent())).setTextMatrixEntries;
                        _u = [0.5, 0, 0, 0.5];
                        _v = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 19:
                        _u = _u.concat([_v.apply(void 0, [((_29.sent()).getPageWidth()).toString()]) - 190]);
                        _w = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 20:
                        _t.apply(_s, _u.concat([_w.apply(void 0, [((_29.sent()).getPageHeight()).toString()]) - 760]));
                        return [4 /*yield*/ , writer];
                    case 21:
                        _y = (_x = (_29.sent())).writeElement;
                        return [4 /*yield*/ , element];
                    case 22:
                        _y.apply(_x, [_29.sent()]);
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
                        return [4 /*yield*/ , builder];
                    case 23:
                        _0 = (_z = (_29.sent())).createNewTextRun;
                        _6 = "Date: ".concat;
                        return [4 /*yield*/ , signatureDate];
                    case 24:
                        _7 = (_5 = _6.apply("Date: ", [(_29.sent()).year, "/"])).concat;
                        return [4 /*yield*/ , signatureDate];
                    case 25:
                        _8 = (_4 = _7.apply(_5, [(_29.sent()).month, "/"])).concat;
                        return [4 /*yield*/ , signatureDate];
                    case 26:
                        _9 = (_3 = _8.apply(_4, [(_29.sent()).day, " at "])).concat;
                        return [4 /*yield*/ , signatureDate];
                    case 27:
                        _10 = (_2 = _9.apply(_3, [(_29.sent()).hour, ":"])).concat;
                        return [4 /*yield*/ , signatureDate];
                    case 28:
                        _11 = (_1 = _10.apply(_2, [(_29.sent()).minute, ":"])).concat;
                        return [4 /*yield*/ , signatureDate];
                    case 29:
                        element = _0.apply(_z, [_11.apply(_1, [(_29.sent()).second])]);
                        return [4 /*yield*/ ,
                            // element.setPosAdjustment(15);
                            element
                        ];
                    case 30:
                        // element.setPosAdjustment(15);
                        _13 = (_12 = (_29.sent())).setTextMatrixEntries;
                        _14 = [0.5, 0, 0, 0.5];
                        _15 = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 31:
                        _14 = _14.concat([_15.apply(void 0, [((_29.sent()).getPageWidth()).toString()]) - 190]);
                        _16 = parseFloat;
                        return [4 /*yield*/ , page1];
                    case 32:
                        // element.setPosAdjustment(15);
                        _13.apply(_12, _14.concat([_16.apply(void 0, [((_29.sent()).getPageHeight()).toString()]) - 775]));
                        return [4 /*yield*/ , builder];
                    case 33:
                        (_29.sent()).createImage;
                        return [4 /*yield*/ , writer];
                    case 34:
                        _18 = (_17 = (_29.sent())).writeElement;
                        return [4 /*yield*/ , element];
                    case 35:
                        _18.apply(_17, [_29.sent()]);
                        fs.writeFileSync('./my-qr-code.png', qr_svg);
                        img = pdfnet_node_1.PDFNet.Image.createFromFile(doc, './my-qr-code.png');
                        return [4 /*yield*/ , builder];
                    case 36:
                        _20 = (_19 = (_29.sent())).createImageScaled;
                        return [4 /*yield*/ , img];
                    case 37:
                        element = _20.apply(_19, [_29.sent(), 300, 600, 200, -150]);
                        return [4 /*yield*/ , writer];
                    case 38:
                        _22 = (_21 = (_29.sent())).writeElement;
                        return [4 /*yield*/ , element];
                    case 39:
                        _22.apply(_21, [_29.sent()]);
                        return [4 /*yield*/ , writer];
                    case 40:
                        _24 = (_23 = (_29.sent())).writeElement;
                        return [4 /*yield*/ , builder];
                    case 41:
                        return [4 /*yield*/ , (_29.sent()).createTextEnd()];
                    case 42:
                        _24.apply(_23, [_29.sent()]);
                        return [4 /*yield*/ , writer];
                    case 43:
                        (_29.sent()).end(); // save changes to the current page
                        _26 = (_25 = doc).pageRemove;
                        return [4 /*yield*/ , doc.getPageIterator(1)];
                    case 44:
                        _26.apply(_25, [_29.sent()]);
                        _28 = (_27 = doc).pagePushBack;
                        return [4 /*yield*/ , page1];
                    case 45:
                        _28.apply(_27, [_29.sent()]);
                        doc.save('mm.pdf', pdfnet_node_1.PDFNet.SDFDoc.SaveOptions.e_remove_unused);
                        pdfnet_node_1.PDFNet.runWithCleanup(this.Sign, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
                        return [2 /*return*/ ];
                }
            });
        });
    };
    // Récuperer la page dont on veut signer
    // creer le builder qui va ajouter des blocks à la page
    ///////////////////////////////
    /////////////////////////////////////////
    DocumentSign.prototype.verify = function() {
        return __awaiter(this, void 0, void 0, function() {
            var in_docpath, in_public_key_file_path, doc1, opts, digsig_fitr, verification_status, curr, result, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, changes, i, _q, change, trust_verification_result, _r, _s, tmp_time_t, cert_path, i, _t, full_cert, issuer_dn, j, subject_dn, j, extension_dn, j;
            return __generator(this, function(_u) {
                switch (_u.label) {
                    case 0:
                        return [4 /*yield*/ , pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _u.sent();
                        in_docpath = 'mm.pdf';
                        in_public_key_file_path = this.certificate;
                        return [4 /*yield*/ , pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(in_docpath)];
                    case 2:
                        doc1 = _u.sent();
                        doc1.initSecurityHandler();
                        console.log('==========');
                        opts = pdfnet_node_1.PDFNet.VerificationOptions.create(pdfnet_node_1.PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving);
                        return [4 /*yield*/ , opts];
                    case 3:
                        (_u.sent()).addTrustedCertificateUString(in_public_key_file_path, pdfnet_node_1.PDFNet.VerificationOptions.CertificateTrustFlag.e_default_trust + pdfnet_node_1.PDFNet.VerificationOptions.CertificateTrustFlag.e_certification_trust);
                        digsig_fitr = doc1.getDigitalSignatureFieldIteratorBegin();
                        console.log(digsig_fitr);
                        verification_status = true;
                        _u.label = 4;
                    case 4:
                        return [4 /*yield*/ , digsig_fitr];
                    case 5:
                        if (!(_u.sent()).hasNext()) return [3 /*break*/ , 42];
                        return [4 /*yield*/ , digsig_fitr];
                    case 6:
                        curr = (_u.sent()).current();
                        return [4 /*yield*/ , curr];
                    case 7:
                        _b = (_a = (_u.sent())).verify;
                        return [4 /*yield*/ , opts];
                    case 8:
                        result = _b.apply(_a, [_u.sent()]);
                        return [4 /*yield*/ , result];
                    case 9:
                        return [4 /*yield*/ , (_u.sent()).getVerificationStatus()];
                    case 10:
                        if (!_u.sent()) return [3 /*break*/ , 13];
                        _d = (_c = console).log;
                        _e = 'Signature verified, objnum: ';
                        return [4 /*yield*/ , curr];
                    case 11:
                        return [4 /*yield*/ , ((_u.sent()).getSDFObj())];
                    case 12:
                        _d.apply(_c, [_e + (_u.sent()).getObjNum()]);
                        return [3 /*break*/ , 16];
                    case 13:
                        _g = (_f = console).log;
                        _h = 'Signature verification failed, objnum: ';
                        return [4 /*yield*/ , curr];
                    case 14:
                        return [4 /*yield*/ , ((_u.sent()).getSDFObj())];
                    case 15:
                        _g.apply(_f, [_h + (_u.sent()).getObjNum()]);
                        verification_status = false;
                        _u.label = 16;
                    case 16:
                        return [4 /*yield*/ , result];
                    case 17:
                        return [4 /*yield*/ , (_u.sent()).getDigestAlgorithm()];
                    case 18:
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
                        return [4 /*yield*/ , result];
                    case 19:
                        _m = _l +
                            (_u.sent()).getDocumentStatusAsString() + '\n\t';
                        return [4 /*yield*/ , result];
                    case 20:
                        _o = _m +
                            (_u.sent()).getDigestStatusAsString() + '\n\t';
                        return [4 /*yield*/ , result];
                    case 21:
                        _p = _o +
                            (_u.sent()).getTrustStatusAsString() + '\n\t';
                        return [4 /*yield*/ , result];
                    case 22:
                        _k.apply(_j, [_p +
                            (_u.sent()).getPermissionsStatusAsString()
                        ]);
                        return [4 /*yield*/ , result];
                    case 23:
                        changes = (_u.sent()).getDisallowedChanges();
                        i = 0;
                        _u.label = 24;
                    case 24:
                        _q = i;
                        return [4 /*yield*/ , changes];
                    case 25:
                        if (!(_q < (_u.sent()).length)) return [3 /*break*/ , 27];
                        change = changes[i];
                        console.log('\tDisallowed change: ' + change.getTypeAsString() + ', objnum: ' + change.getObjNum());
                        _u.label = 26;
                    case 26:
                        ++i;
                        return [3 /*break*/ , 24];
                    case 27:
                        return [4 /*yield*/ , result];
                    case 28:
                        return [4 /*yield*/ , (_u.sent()).hasTrustVerificationResult()];
                    case 29:
                        if (!_u.sent()) return [3 /*break*/ , 39];
                        return [4 /*yield*/ , result];
                    case 30:
                        return [4 /*yield*/ , (_u.sent()).getTrustVerificationResult()];
                    case 31:
                        trust_verification_result = _u.sent();
                        _s = (_r = console).log;
                        return [4 /*yield*/ , trust_verification_result.wasSuccessful()];
                    case 32:
                        _s.apply(_r, [(_u.sent()) ? 'Trust verified.' : 'Trust not verifiable.']);
                        console.log(trust_verification_result.getResultString());
                        tmp_time_t = trust_verification_result.getTimeOfTrustVerification();
                        return [4 /*yield*/ , trust_verification_result.getTimeOfTrustVerificationEnum()];
                    case 33:
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
                        return [4 /*yield*/ , cert_path];
                    case 34:
                        if (!((_u.sent()).length == 0)) return [3 /*break*/ , 35];
                        console.log('Could not print certificate path.');
                        return [3 /*break*/ , 39];
                    case 35:
                        console.log('Certificate path:');
                        i = 0;
                        _u.label = 36;
                    case 36:
                        _t = i;
                        return [4 /*yield*/ , cert_path];
                    case 37:
                        if (!(_t < (_u.sent()).length)) return [3 /*break*/ , 39];
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
                        _u.label = 38;
                    case 38:
                        i++;
                        return [3 /*break*/ , 36];
                    case 39:
                        console.log(result);
                        _u.label = 40;
                    case 40:
                        return [4 /*yield*/ , digsig_fitr];
                    case 41:
                        (_u.sent()).next();
                        return [3 /*break*/ , 4];
                    case 42:
                        pdfnet_node_1.PDFNet.runWithCleanup(this.verify, 'demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
                        return [2 /*return*/ ];
                }
            });
        });
    };
    return DocumentSign;
}());
pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170');
var a = new DocumentSign('CV.pdf', 'certificatea.pfx');
a.Sign();