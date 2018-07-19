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
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
//import { Overlay } from 'angular2-modal';
var index_1 = require('angular2-modal/plugins/bootstrap/index');
var player_service_1 = require('../player/player.service');
var zones_service_1 = require('../zones/zones.service');
var action_service_1 = require('../actions/action.service');
var klass_service_1 = require('../klasses/klass.service');
var perk_service_1 = require('../perks/perk.service');
var stats_service_1 = require('../stats/stats.service');
var serialization_service_1 = require('./serialization.service');
require('../rxjs-operators');
var di_tokens_1 = require('./di-tokens');
var globals_1 = require('../globals');
var index_2 = require('../core/index');
var AppComponent = (function () {
    function AppComponent(serials, Stats, PS, KS, modal) {
        this.serials = serials;
        this.Stats = Stats;
        this.PS = PS;
        this.KS = KS;
        this.modal = modal;
        this.cheatMode = globals_1.GLOBALS.cheatMode;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (globals_1.GLOBALS.autoSave) {
            Observable_1.Observable.interval(globals_1.GLOBALS.autoSaveIntervalMs).subscribe(function () {
                _this.serials.save();
            });
        }
        Observable_1.Observable.interval(globals_1.GLOBALS.unlockCheckInterval).subscribe(function () {
            // TODO: this kinda sucks
            _this.KS.checkUnlocks(_this.PS);
            /** TODO: this also sucks. Really should be an observable for
            named unlocks. **/
            if (_this.Stats.unlocked(index_2.NamedUnlock.SpaceTimeConquered) &&
                !_this.Stats.unlocked(index_2.NamedUnlock.BeatTheGameCongrats)) {
                _this.Stats.unlock(index_2.NamedUnlock.BeatTheGameCongrats);
                _this.beatTheGameModal();
            }
        });
        this.lvl10sub = this.PS.playerLevel$.subscribe(function (lvl) {
            if (lvl == globals_1.GLOBALS.reincarnationMinLevel &&
                !_this.Stats.unlocked(index_2.NamedUnlock.ReincarnationAvailableHelp)) {
                _this.reincarnationModal();
                _this.Stats.unlock(index_2.NamedUnlock.ReincarnationAvailableHelp);
            }
            if (lvl == globals_1.GLOBALS.zoneLevelingMinLevel &&
                !_this.Stats.unlocked(index_2.NamedUnlock.ZoneLevelingHelp)) {
                _this.zoneLevelingModal();
                _this.Stats.unlock(index_2.NamedUnlock.ZoneLevelingHelp);
            }
        });
    };
    AppComponent.prototype.beatTheGameModal = function () {
        var email = 'colin' + '.' + 'morris' + (1 + 1) + '@gmail.com';
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title("Congratulations")
            .body("<p>You beat the game! That's it for now.</p>\n            <p>There may be more endgame content coming at some point, including\n            prestiging and \"dual class\" mechanics, so check back later.\n            </p>\n            <p>If you enjoyed the game and have ideas about what you'd like to\n            see added, or balance suggestions, <a href=\"mailto:" + email + "\">\n            let me know</a>.</p>\n            ")
            .open();
    };
    AppComponent.prototype.zoneLevelingModal = function () {
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title("Level " + globals_1.GLOBALS.zoneLevelingMinLevel + "!")
            .body("<p>You've earned a <b>Zone Improvement Token</b>. You'll get\n            one at level 25, and every 5th level after that. You can spend a\n            token to 'level up' a zone, increasing its difficulty and the skill\n            points it awards.</p>\n            <p>You can't take them with you - tokens reset to 0 on reincarnation,\n            so spend them while you can.</p>")
            .open();
    };
    AppComponent.prototype.reincarnationModal = function () {
        /** TODO: Anchor links to Classes pane don't really work here, since
        they cause a page reload. Boo. Maybe I should just use hashtag
        navigation. Would also help with some of the quirks that come
        with gh-pages + single page sites.
        **/
        var s = this.KS.nUnlocked > 1 ?
            "看起来你已经解锁了一个新类。前往阶级选项卡，开始新的生活。或者如果你没有上进心，你可以继续过农民的生活……"
            :
                "看起来您还没有解锁任何阶级。前往阶级选项卡获取一些解锁提示。如果你真的想要，你可以转世成一个一级农民(也在阶级选项卡里面)，然后重新开始，记得要稍微提高你的能力。";
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title("Level " + globals_1.GLOBALS.reincarnationMinLevel + "!")
            .body("<p>祝贺达到等级 " + globals_1.GLOBALS.reincarnationMinLevel + ".\n                你现在可以 <b>转生</b>。转世让你作为一个不同的阶级过着新的生活。 在你的第一次转生之后，你将开始提升你的能力，基于你已经达到的最高级别，每一个阶级都要付出代价——尽可能多地解锁阶级和升级。</p>\n                <p>" + s + "</p>\n                ").open();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [router_1.ROUTER_DIRECTIVES],
            styles: ["\n        .save {\n            margin-top: 15px;\n        }\n        /* TODO: this is hacky in every respect */\n        >>> .toast-klassname {\n            margin-left: 110px;\n        }\n    "],
            template: "\n    <span defaultOverlayTarget></span>\n    <simple-notifications></simple-notifications>\n    <div class=\"container\">\n    <ul class=\"nav nav-pills\">\n        <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\">\n            <a [routerLink]=\"['/']\">首页</a></li>\n        <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['/classes']\">阶级</a></li>\n        <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['/stats']\">统计</a></li>\n        <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['/about']\">关于</a></li>\n        <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['/debug']\" *ngIf=\"cheatMode\">调试</a></li>\n    </ul>\n    <router-outlet></router-outlet>\n    <div class=\"row save\" *ngIf=\"cheatMode\">\n    <button (click)=\"serials.save()\">保存</button>\n    <button (click)=\"serials.clearSave()\">清除存档</button>\n    </div>\n    </div>\n  ",
            providers: [index_1.Modal,
                zones_service_1.Zones, klass_service_1.KlassService, serialization_service_1.SerializationService,
                stats_service_1.StatsService,
                { provide: di_tokens_1.di_tokens.statsservice, useExisting: stats_service_1.StatsService },
                perk_service_1.PerkService,
                { provide: di_tokens_1.di_tokens.perkservice, useExisting: perk_service_1.PerkService },
                player_service_1.PlayerService,
                { provide: di_tokens_1.di_tokens.playerservice, useExisting: player_service_1.PlayerService },
                action_service_1.ActionService,
                { provide: di_tokens_1.di_tokens.actionservice, useExisting: action_service_1.ActionService }
            ]
        }), 
        __metadata('design:paramtypes', [serialization_service_1.SerializationService, stats_service_1.StatsService, player_service_1.PlayerService, klass_service_1.KlassService, index_1.Modal])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map