import { TsCard } from 'tscard';
import { Sle } from 'tscard/cards/memorycard';
import Utilities from 'tscard/utilities';

class Demo {
    static async readUserData() {

        console.log("started");
        let tsCard = TsCard.instance;

        try {

            let myReader = await tsCard.detectReader();
            console.log(myReader.name);
    
            console.log('wait for card...');
            let myCard = await tsCard.insertCard();
    
            if (!myCard[0])
            {
                tsCard.close();
                return;    
            }
    
            console.log("select MF...");
            let apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0x3F, 0x00]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
    
            console.log("select DF1...");
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0x11, 0x00]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
    
            console.log("select EF.Dati_personali...");
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0x11, 0x02]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
    
            console.log("read record...");
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xB0,
                P1: 0x00,
                P2: 0x00,
                Le: 2000,
                Lc: 0
            }, []);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
            console.log(`dataHex: ${Utilities.bytesToHexString(apduResult.Data)}`)
            console.log(`data: ${apduResult.Data}`)
    
            if (myCard[1] instanceof Sle){
                let mySle = myCard[1] as Sle;
                let retRead = await mySle.readBytes(32,224);
                if (retRead[0]){
                    console.log(`buffer letto: ${Utilities.bytesToHexString(retRead[1])}`);
                }
            }
    
            tsCard.removeCard();
        } catch (error){
            console.log(error);
        }
        finally{

            tsCard.close();
        }
    }

    static async readHealthData() {

        console.log("started");
        let tsCard = TsCard.instance;
        
        try {

            let myReader = await tsCard.detectReader();
            console.log(myReader.name);
    
            console.log('wait for card...');
            let myCard = await tsCard.insertCard();
    
            if (!myCard[0])
            {
                tsCard.close();
                return;    
            }
    
            console.log("select MF 3F00...");
            let apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0x3F, 0x00]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
    
            console.log("select Netlink D000...");
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0xD0, 0x00]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)

            console.log("select DF.NKEF D200...");
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0xD2, 0x00]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)

            console.log("select EF.NKEF D201..."); // emergency free data
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xA4,
                P1: 0x00,
                P2: 0x00,
                Le: 0x00,
                Lc: 2
            }, [ 0xD2, 0x01]);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
    
            console.log("read record...");
            apduResult = await myReader.sendApdu(myCard[1],{
                Cla: 0x00,
                Ins: 0xB0,
                P1: 0x00,
                P2: 0x00,
                Le: 2000,
                Lc: 0
            }, []);
            console.log(`apduResult: ${Utilities.bytesToHexString(apduResult.SW)}`)
            console.log(`dataHex: ${Utilities.bytesToHexString(apduResult.Data)}`)
            console.log(`data: ${apduResult.Data}`)
    
            if (myCard[1] instanceof Sle){
                let mySle = myCard[1] as Sle;
                let retRead = await mySle.readBytes(32,224);
                if (retRead[0]){
                    console.log(`buffer letto: ${Utilities.bytesToHexString(retRead[1])}`);
                }
            }
    
            console.log("remove card...");
            tsCard.removeCard();
            console.log("removed");
        } catch (error){
            console.log(error);
        }
        finally{

            tsCard.close();
        }
    }
}

Demo.readHealthData();