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
var DocumentSV = /** @class */ (function () {
    // ---------------- Preparation --------------------
    // Récuperer le document dont on veut signer
    function DocumentSV() {
        this.statu = 0;
    }
    DocumentSV.prototype.Sign = function (docpath, pfxpath) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, page1, builder, writer, certification_sig_field, widgetAnnot, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, fields_to_lock, element, _l, _m, _o, _p, _q, _r, _s, options, qr_svg, signatureDate, _t, _u, _v, _w, _x, img, _y, _z, _0, _1, err_1;
            return __generator(this, function (_2) {
                switch (_2.label) {
                    case 0:
                        _2.trys.push([0, 42, , 43]);
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _2.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(docpath)];
                    case 2:
                        doc = _2.sent();
                        return [4 /*yield*/, doc.getPage(1)];
                    case 3:
                        page1 = _2.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.ElementBuilder.create()];
                    case 4:
                        builder = _2.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.ElementWriter.create()];
                    case 5:
                        writer = _2.sent();
                        return [4 /*yield*/, doc.createDigitalSignatureField('Certificate')];
                    case 6:
                        certification_sig_field = _2.sent();
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
                        return [4 /*yield*/, page1.annotPushBack(widgetAnnot)];
                    case 13:
                        _2.sent();
                        fields_to_lock = ['asdf_test_field'];
                        return [4 /*yield*/, certification_sig_field.setFieldPermissions(pdfnet_node_1.PDFNet.DigitalSignatureField.FieldPermissions.e_include, fields_to_lock)];
                    case 14:
                        _2.sent();
                        return [4 /*yield*/, certification_sig_field.certifyOnNextSave(pfxpath, 'ahmedahmed')];
                    case 15:
                        _2.sent();
                        // Ajouter les Permissions à la signature
                        return [4 /*yield*/, writer.beginOnPage(page1)];
                    case 16:
                        // Ajouter les Permissions à la signature
                        _2.sent();
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
    DocumentSV.prototype.verify = function (in_docpath) {
        return __awaiter(this, void 0, void 0, function () {
            var doc1, opts, digsig_fitr, verification_status, curr, result, _a, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 19, , 20]);
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.initialize('demo:omaralami230@gmail.com:7b01f4ab020000000092768e068e8737e8b8c939452e7892e0470df170')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.PDFDoc.createFromFilePath(in_docpath)];
                    case 2:
                        doc1 = _b.sent();
                        return [4 /*yield*/, doc1.initSecurityHandler()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, pdfnet_node_1.PDFNet.VerificationOptions.create(pdfnet_node_1.PDFNet.VerificationOptions.SecurityLevel.e_compatibility_and_archiving)];
                    case 4:
                        opts = _b.sent();
                        return [4 /*yield*/, doc1.getDigitalSignatureFieldIteratorBegin()];
                    case 5:
                        digsig_fitr = _b.sent();
                        verification_status = true;
                        return [4 /*yield*/, doc1.hasSignatures()];
                    case 6:
                        if (!!(_b.sent())) return [3 /*break*/, 7];
                        this.statu = 1;
                        return [3 /*break*/, 18];
                    case 7: return [4 /*yield*/, digsig_fitr.hasNext()];
                    case 8:
                        if (!_b.sent()) return [3 /*break*/, 18];
                        return [4 /*yield*/, digsig_fitr.current()];
                    case 9:
                        curr = _b.sent();
                        return [4 /*yield*/, curr.verify(opts)];
                    case 10:
                        result = _b.sent();
                        return [4 /*yield*/, result.getDigestStatus()];
                    case 11:
                        _a = (!((_b.sent()) == 1));
                        if (!_a) return [3 /*break*/, 13];
                        return [4 /*yield*/, result.getDigestStatus()];
                    case 12:
                        _a = (!((_b.sent()) == 3));
                        _b.label = 13;
                    case 13:
                        if (!_a) return [3 /*break*/, 14];
                        this.statu = 2;
                        return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, result.getPermissionsStatus()];
                    case 15:
                        if ((_b.sent()) != 2) {
                            this.statu = 3;
                        }
                        _b.label = 16;
                    case 16: return [4 /*yield*/, digsig_fitr.next()];
                    case 17:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 18: return [2 /*return*/, this.statu];
                    case 19:
                        err_2 = _b.sent();
                        return [2 /*return*/, this.statu];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    return DocumentSV;
}());
var a = new DocumentSV();
function launchVerification() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = console).log;
                    return [4 /*yield*/, a.verify('CV.pdf')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    (0, process_1.exit)(1);
                    return [2 /*return*/];
            }
        });
    });
}
launchVerification();
