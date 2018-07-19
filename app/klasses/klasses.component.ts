import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ActionService } from '../actions/action.service';
import { PerkService } from '../perks/perk.service';
import { PlayerService } from '../player/player.service';
import { LiveKlass, KlassService } from './klass.service';
import { StatsService } from '../stats/stats.service';
import { Zones } from '../zones/zones.service';

import { SkillComponent } from '../shared/skill.component';
import { MultiplierPipe } from '../shared/multiplier.pipe';

import { SkillType, NamedUnlock, SkillMap } from '../core/index';
import { GLOBALS } from '../globals';

@Component({
    selector: 'klass-viewer',
    directives: [SkillComponent],
    pipes: [MultiplierPipe],
    styles: [
        `.big-icon {
            /*width: 216px;*/
            width: 180px;
        }
        img.locked {
            -webkit-filter: contrast(0);
            filter: contrast(0);
        }
        ul {
            list-style: none;
        }
        .reincarnate-button {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .glyphicon-arrow-right {
            margin-top: 100%;
        }
        .progress {
            /* Match the size of skill icons */
            height: 32px;
            /* Rounded corners create weird lacunae when the bars are packed together */
            border-radius: 0px;
        }
        .apt-row {
            margin-top: 0px;
            margin-bottom: 0px;
            height: 32px;
            padding-top: 0px;
            padding-bottom: 0px;
        }
        .apt-row div {
            max-height: 32px;
        }
        .stats-panel {
            margin-top: 15px;
        }
        `
    ],
    /** TODO: This template is huuuge. Split into subcomponents and/or move
    to a separate file.
    **/
    /** Modal code taken from this SO answer: http://stackoverflow.com/a/37402577/262271
    TODO: Definitely consider component-izing at some point. Probably useful elsewhere.
    https://toddmotto.com/transclusion-in-angular-2-with-ng-content
    **/
    template: `
<div *ngIf="reincarnating" class="modal fade show in danger" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"
                    (click)="reincarnating=false">&times;
                </button>
                <h4 class="modal-title">Reincarnate?</h4>
            </div>
            <div class="modal-body">

            <div class="row">
                <div class="col-xs-5">
                    <img class="big-icon"
                        [src]="KS.iconForKlass(PS.player.klass)">
                </div>
                <div class="col-xs-2">
                    <h2><span class="glyphicon glyphicon-arrow-right"></span></h2>
                </div>
                <div class="col-xs-5">
                    <img class="big-icon"
                        [src]="KS.iconForKlass(KS.focalKlass.name)">
                </div>
            </div>

            <dl>
                <dt>Level</dt>
                <dd>{{PS.player.level}}</dd>

                <dt>Previous best</dt>
                <dd>{{Stats.playerLevel(PS.player.klass)}}</dd>

                <template [ngIf]="PS.player.level > Stats.playerLevel(PS.player.klass)">
                <dt>{{PS.player.klass}} ancestry bonus</dt>
                <dd>{{Perks.ancestryBonusForLevel(PS.player.level) | multiplier}}
                (previously:
                    {{Perks.ancestryBonusForLevel(Stats.playerLevel(PS.player.klass)) | multiplier}})
                </dd>
                <dt>Overall ancestry bonus</dt>
                <dd>
                {{Perks.ancestryBonusWithSub(Stats, PS.player.klass, PS.player.level) | multiplier}}
                (previously: {{Perks.ancestryBonus(Stats) | multiplier}})
                </template>
            </dl>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" (click)="reincarnate()">
                    Reincarnate
                </button>
                <button type="button"
                    class="btn btn-default"
                    (click)="reincarnating=false">Never mind
                </button>
            </div>
        </div>
    </div>
</div>

<div class="row">

<div class="col-xs-4">
<div *ngIf="KS.focalKlass" class="focal">
    <h2>{{displayName(KS.focalKlass)}}</h2>
    <img [src]="'assets/units/' + KS.focalKlass.img"
        class="big-icon"
        [class.locked]="!KS.focalKlass.unlocked">

    <h3><span class="label label-default">天赋</span></h3>
    <div class="apts">
        <div class="row apt-row"
            *ngFor="let pair of aptitudePairs(KS.focalKlass)">
            <template ngFor let-apt [ngForOf]="pair">
                <div class="col-xs-1">
                    <skill [skill]="apt.i" [title]="ST[apt.i]"></skill>
                </div>
                <div class="col-xs-5">
                    <div class="progress"
                        [title]="aptTitle(apt)"
                    >
                        <div class="progress-bar progress-bar-{{aptStyle(apt.apt)}}"
                        [style.width.%]="100*apt.apt/2.0"
                        ></div>
                    </div>
                </div>

            </template>
        </div>
        <p *ngIf="cheatMode">DEBUG: Sum of apts={{sumapts(KS.focalKlass.aptitudes) | number:'1.1-1'}}</p>
    </div>

    <div *ngIf="KS.focalKlass.unlocked">
    <p><b>{{Perks.perkForKlass(KS.focalKlass.name).sname}}</b>
        {{Perks.perkForKlass(KS.focalKlass.name).sdescription}}
    </p>
    <p><b>Max level reached:</b>{{Stats.playerLevel(KS.focalKlass.name)}}</p>
    </div>

    <button *ngIf="(KS.focalKlass.unlocked)
                    || cheatMode"
        class="btn btn-default reincarnate-button center-block"
        [class.disabled]="!cheatMode && PS.player.level < 10"
        (click)="reincarnating=true">
            Reincarnate!
    </button>
    <div *ngIf="!KS.focalKlass.unlocked">
        <p *ngIf="KS.focalKlass.progress != undefined">
            Unlock progress: {{KS.focalKlass.progress | percent:'1.0-0'}}
        </p>
        <p><b>Hint:</b> {{KS.focalKlass.hint}}</p>

    </div>
</div>
</div>

<div class="col-xs-8">
    <div class="row">
        <div *ngFor="let klass of KS.allKlasses"
            class="col-xs-2"
        >
            <img [src]="'assets/units/' + klass.img"
                [class.locked]="!klass.unlocked"
                (click)="KS.focalKlass=klass"
                >
            <div>
            <a (click)="KS.focalKlass=klass">{{displayName(klass)}}</a>
            </div>
        </div>
    </div>

    <div class="panel panel-default stats-panel">
    <div class="panel-body">
    <div class="row">
    <div class="col-xs-3 col-xs-offset-3">
        <p>{{KS.nUnlocked}} / {{KS.nKlasses}} classes unlocked</p>
    </div>
    <div class="col-xs-3">
        <input type="checkbox" [(ngModel)]="showMaxLevelsInline">
        <span>Show max levels</span>
    </div>
    </div></div></div>
</div>

</div>
    `
})
export class KlassesComponent {
    /** TODO: This should probably be sticky. **/
    showMaxLevelsInline = false;
    reincarnating: boolean = false;
    reincMinLevel = GLOBALS.reincarnationMinLevel;
    ST = SkillType;
    cheatMode = GLOBALS.cheatMode;
    constructor (
        private KS: KlassService,
        private PS: PlayerService,
        private AS: ActionService,
        private Perks: PerkService,
        private Stats: StatsService,
        private ZS: Zones,
        private router: Router
    ) {
    }

    sumapts(apts: SkillMap) {
        return apts.reduce( (acc, val) => acc+val, 0);
    }

    displayName(klass: LiveKlass) {
        if (!klass.unlocked) {
            return '???';
        }
        let name = klass.name;
        if (this.showMaxLevelsInline) {
            name += ` (${this.Stats.playerLevel(klass.name)})`;
        }
        return name;
    }

    // Bleh, hack
    aptitudePairs(klass: LiveKlass) {
        let pairs = [];
        for (let i=0; i < SkillType.MAX; i+=2) {
            let pair = [
                {i: i, apt: klass.aptitudes[i]},
                {i: i+1, apt: klass.aptitudes[i+1]},
            ];
            pairs.push(pair);
        }
        return pairs;
    }

    aptTitle(apt: {i: number, apt: number}) {
        return `Base ${SkillType[apt.i]} aptitude: ${apt.apt}`;
    }

    aptStyle(apt: number) {
        if (apt < .5) {
            return 'danger';
        } else if (apt <= 1.0) {
            return 'warning';
        } else {
            return 'success';
        }
    }

    reincarnate() {
        /** Reincarnation todo list:
        - stop any currently running actions
        - clear inventory
        - remove all buffs and perks
        - create a new player object and assign the appropriate perks (taken
            care of by player service)
        */
        // TODO: Should also reset the focal zone (incl. clearing currentAction/lastOutcome)
        this.AS.stopAllActions();

        /** TODO: This is kind of lame. Should try to find a more appropriate
        place for this logic at some point. **/
        if (
            (!this.Stats.unlocked(NamedUnlock.Pacifist)) &&
            (this.PS.player.level >= 10) &&
            (this.PS.player.skills[SkillType.Combat].baseLevel < 1)
        ) {
            this.Stats.unlock(NamedUnlock.Pacifist);
        }
        this.Stats.setLevel(this.PS.player.level, this.PS.player.klass);
        this.Stats.reincarnated();

        this.ZS.reloadZones();
        this.ZS.resetFocalZone();
        this.Perks.onReincarnate();
        this.PS.reincarnate(this.KS.focalKlass.name);
        this.Perks.postReincarnate();
        this.router.navigate(['/']);
    }
}
