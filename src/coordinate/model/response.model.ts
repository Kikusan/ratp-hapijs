import { RecordModel } from './record.model';
import { LinksModel } from './links.model';
export class ResponseModel {
    data: RecordModel[];
    _links: LinksModel;

}