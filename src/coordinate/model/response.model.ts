import { RecordModel } from './record.model';
import { LinksModel } from './links.model';
export class ResponseModel {
    total: number;
    data: RecordModel[];
    _links: LinksModel;

}