import {initializeApp, getApp,getApps, cert,App} from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"
import { ServiceAccount } from "firebase-admin";

import serviceKey from "@/service_key.json" assert { type: "json" };

// const servicekey = require("@/service_key.json")

let app:App;
const serviceAccount = serviceKey as ServiceAccount;
if(getApps().length==0){
    app=initializeApp({
        credential:cert(serviceAccount),
    });
}
else{
    app=getApp();
}

const adminDb = getFirestore(app);

export {app as adminApp , adminDb}