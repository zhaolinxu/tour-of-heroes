"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../core/index');
var SkillGainsPipe = (function () {
    function SkillGainsPipe() {
    }
    SkillGainsPipe.prototype.transform = function (gains) {
        var gainstr = '';
        for (var _i = 0, _a = index_1.getTruthySkills(gains); _i < _a.length; _i++) {
            var skill = _a[_i];
            if (gainstr != '') {
                gainstr += ', ';
            }
            var skillName = index_1.SkillType[skill];
            // TODO: probably makes more sense as a component to make use of builtin pipes?
            gainstr += cnText(skillName) + "+" + gains[skill].toFixed(1);
        }
        return gainstr;
    };
    SkillGainsPipe = __decorate([
        core_1.Pipe({ name: 'skillgains' }), 
        __metadata('design:paramtypes', [])
    ], SkillGainsPipe);
    return SkillGainsPipe;
}());
exports.SkillGainsPipe = SkillGainsPipe;
//# sourceMappingURL=skill-gains.pipe.js.map

//汉化人物属性
function cnText(text){
    var cntext="";
    var temp=text;
    if(temp=="Farming"){
        cntext="耕作"
    }else if(temp=="Combat"){
        cntext="战斗"
    }else if(temp=="Survival"){
        cntext="生存"
    }else if(temp=="Charm"){
        cntext="魅力"
    }else if(temp=="Stealth"){
        cntext="隐形"
    }else if(temp=="Riding"){
        cntext="骑术"
    }else if(temp=="Intellect"){
        cntext="智力"
    }else if(temp=="Piety"){
        cntext="虔诚"
    }else if(temp=="MAX"){
        cntext="最大"
    }else{
console.log("需汉化的英文："+text);
        return text;
    }
    return cntext;
}