"use strict";
(function (SkillType) {
    SkillType[SkillType["Farming"] = 0] = "耕作";
    SkillType[SkillType["Combat"] = 1] = "战斗";
    SkillType[SkillType["Survival"] = 2] = "生存";
    SkillType[SkillType["Charm"] = 3] = "魅力";
    SkillType[SkillType["Stealth"] = 4] = "隐形";
    SkillType[SkillType["Riding"] = 5] = "骑术";
    SkillType[SkillType["Intellect"] = 6] = "智力";
    SkillType[SkillType["Piety"] = 7] = "虔诚";
    SkillType[SkillType["MAX"] = 8] = "最大";
})(exports.SkillType || (exports.SkillType = {}));
var SkillType = exports.SkillType;
var skill_images_wesnoth = [
    'pitchfork.png',
    'sword-human.png',
    'torch.png',
    'instrument_kantele.png',
    'sandals.png',
    'fangs.png',
    'scroll_red.png',
    'ankh_necklace.png'
];
exports.skill_images = [
    'fedhas.png',
    'long_blades.png',
    'ice_magic.png',
    'nemelex_xobeh.png',
    'stealth.png',
    'unarmed_combat_paw.png',
    'spellcasting.png',
    'invocations.png'
].map(function (fname) { return 'assets/skills_dcss/' + fname; });
//# sourceMappingURL=skilltype.enum.js.map