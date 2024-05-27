import { FareCalculator } from './FareCalculator';
import { TubeJourney } from './TubeJourney';
import { BusJourney } from './BusJourney';
import { Station } from './Station';

export class OysterCard {
    private balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    load(amount: number): void {
        this.balance += amount;
    }

    private charge(amount: number): void {
        this.balance -= amount;
    }

    private refund(amount: number): void {
        this.balance += amount;
    }

    enterStation(station: Station): void {
        this.charge(FareCalculator.FARES.THREE_ZONES);
    }

    exitStation(journey: TubeJourney): void {
        const fare = FareCalculator.calculateFare(journey);
        this.refund(FareCalculator.FARES.THREE_ZONES);
        this.charge(fare); 
    }

    takeBus(busJourney: BusJourney): void {
        this.charge(FareCalculator.FARES.BUS);
    }

    getBalance(): number {
        return this.balance;
    }
}
