"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tscard_1 = require("tscard");
const memorycard_1 = require("tscard/cards/memorycard");
const utilities_1 = require("tscard/utilities");
class Demo {
    static readUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("started");
            let tsCard = tscard_1.TsCard.instance;
            try {
                let myReader = yield tsCard.detectReader();
                console.log(myReader.name);
                console.log('wait for card...');
                let myCard = yield tsCard.insertCard();
                if (!myCard[0]) {
                    tsCard.close();
                    return;
                }
                console.log("select MF...");
                let apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0x3F, 0x00]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("select DF1...");
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0x11, 0x00]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("select EF.Dati_personali...");
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0x11, 0x02]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("read record...");
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xB0,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 2000,
                    Lc: 0
                }, []);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log(`dataHex: ${utilities_1.default.bytesToHexString(apduResult.Data)}`);
                console.log(`data: ${apduResult.Data}`);
                if (myCard[1] instanceof memorycard_1.Sle) {
                    let mySle = myCard[1];
                    let retRead = yield mySle.readBytes(32, 224);
                    if (retRead[0]) {
                        console.log(`buffer letto: ${utilities_1.default.bytesToHexString(retRead[1])}`);
                    }
                }
                tsCard.removeCard();
            }
            catch (error) {
                console.log(error);
            }
            finally {
                tsCard.close();
            }
        });
    }
    static readHealthData() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("started");
            let tsCard = tscard_1.TsCard.instance;
            try {
                let myReader = yield tsCard.detectReader();
                console.log(myReader.name);
                console.log('wait for card...');
                let myCard = yield tsCard.insertCard();
                if (!myCard[0]) {
                    tsCard.close();
                    return;
                }
                console.log("select MF 3F00...");
                let apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0x3F, 0x00]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("select Netlink D000...");
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0xD0, 0x00]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("select DF.NKEF D200...");
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0xD2, 0x00]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("select EF.NKEF D201..."); // emergency free data
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xA4,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 0x00,
                    Lc: 2
                }, [0xD2, 0x01]);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log("read record...");
                apduResult = yield myReader.sendApdu(myCard[1], {
                    Cla: 0x00,
                    Ins: 0xB0,
                    P1: 0x00,
                    P2: 0x00,
                    Le: 2000,
                    Lc: 0
                }, []);
                console.log(`apduResult: ${utilities_1.default.bytesToHexString(apduResult.SW)}`);
                console.log(`dataHex: ${utilities_1.default.bytesToHexString(apduResult.Data)}`);
                console.log(`data: ${apduResult.Data}`);
                if (myCard[1] instanceof memorycard_1.Sle) {
                    let mySle = myCard[1];
                    let retRead = yield mySle.readBytes(32, 224);
                    if (retRead[0]) {
                        console.log(`buffer letto: ${utilities_1.default.bytesToHexString(retRead[1])}`);
                    }
                }
                console.log("remove card...");
                tsCard.removeCard();
                console.log("removed");
            }
            catch (error) {
                console.log(error);
            }
            finally {
                tsCard.close();
            }
        });
    }
}
Demo.readHealthData();
//# sourceMappingURL=main.js.map