import { BusJourney } from "./BusJourney";
import { TubeJourney } from "./TubeJourney";
import { ZoneEnum } from "./enums/ZoneEnum";


export class FareCalculator {
    static readonly FARES = {
        ZONE_1: 2.50,
        ONE_ZONE_OUTSIDE_ZONE_1: 2.00,
        TWO_ZONES_INCLUDING_ZONE_1: 3.00,
        TWO_ZONES_EXCLUDING_ZONE_1: 2.25,
        THREE_ZONES: 3.20,
        BUS: 1.80
    };

    static calculateFare(journey: TubeJourney | BusJourney): number {
        const fromZones = journey.from.zones;
        const toZones = journey.to.zones;
        const allZones = new Set([...fromZones, ...toZones]);

        const zoneCount = allZones.size;
        const includesZone1 = allZones.has(ZoneEnum.Zone1);

        switch (zoneCount) {
            case 1:
                return includesZone1 ? FareCalculator.FARES.ZONE_1 : FareCalculator.FARES.ONE_ZONE_OUTSIDE_ZONE_1;

            case 2:
                if (includesZone1) {
                    return Math.min(FareCalculator.FARES.ZONE_1, FareCalculator.FARES.TWO_ZONES_INCLUDING_ZONE_1);
                } else {
                    return FareCalculator.FARES.TWO_ZONES_EXCLUDING_ZONE_1;
                }

            case 3:
                return FareCalculator.FARES.THREE_ZONES;

            default:
                return FareCalculator.FARES.THREE_ZONES;
        }
    }
}
