import { BusJourney } from '../src/BusJourney';
import { OysterCard } from '../src/OysterCard';
import { Station } from '../src/Station';
import { TubeJourney } from '../src/TubeJourney';
import { ZoneEnum } from '../src/enums/ZoneEnum';


describe('OysterCard System', () => {
    let myCard: OysterCard;
    let Holborn: Station;
    let EarlsCourt: Station;
    let Wimbledon: Station;
    let Hammersmith: Station;

    beforeEach(() => {
        Holborn = new Station("Holborn", [ZoneEnum.Zone1]);
        EarlsCourt = new Station("Earl's Court", [ZoneEnum.Zone1, ZoneEnum.Zone2]);
        Wimbledon = new Station("Wimbledon", [ZoneEnum.Zone3]);
        Hammersmith = new Station("Hammersmith", [ZoneEnum.Zone2]);


        myCard = new OysterCard();
        myCard.load(30);
    });

    test('should correctly handle a journey from Holborn to Earl\'s Court by Tube', () => {
        myCard.enterStation(Holborn);
        myCard.exitStation(new TubeJourney(Holborn, EarlsCourt));
        expect(myCard.getBalance()).toBe(27.50);
    });

    test('should correctly handle a bus journey from Earl\'s Court to Wimbledon(Chelsea) ', () => {
        myCard.takeBus(new BusJourney(EarlsCourt, Wimbledon));
        expect(myCard.getBalance()).toBe(28.2);
    });

    test('should correctly handle a journey from Earl\'s Court to Hammersmith by Tube', () => {
        myCard.enterStation(EarlsCourt);
        myCard.exitStation(new TubeJourney(EarlsCourt, Hammersmith));
        expect(myCard.getBalance()).toBe(27.5);
    });

    test('should perform the full test scenario', () => {
        myCard.enterStation(Holborn);
        myCard.exitStation(new TubeJourney(Holborn, EarlsCourt));
        expect(myCard.getBalance()).toBe(27.50);

        myCard.takeBus(new BusJourney(EarlsCourt, Wimbledon));
        expect(myCard.getBalance()).toBe(25.70);

        myCard.enterStation(EarlsCourt);
        myCard.exitStation(new TubeJourney(EarlsCourt, Hammersmith));
        expect(myCard.getBalance()).toBe(23.20);
    });
});
