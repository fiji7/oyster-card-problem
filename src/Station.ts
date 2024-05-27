import { ZoneEnum } from "./enums/ZoneEnum";


export class Station {
    constructor(public name: string, public zones: ZoneEnum[]) { }
}
