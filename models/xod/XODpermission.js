const mongoose = require("mongoose");
const { Schema } = mongoose;


const XODPermissionSchema = new Schema({

    Establishid: {type: String, required: true},
    StaffId: {type: String, required: true},
    AchievementId: {type: String, required: true},
    Points: {type: Number, required: false},
    Outcome: {type: String, required: false},
    OutcomeCode: {type: String, required: false},
    LastUpdated: {type: Date, required: false},
    RowHash: {type: String, required: true}


});

mongoose.model("xodpermissions", XODPermissionSchema);
