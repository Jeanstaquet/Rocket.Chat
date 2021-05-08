import { IRocketChatRecord } from './IRocketChatRecord';
import { IUser } from './IUser';
import { ChannelName, RoomID } from './IRoom';

type MentionType = 'user' | 'team';

export interface IMessage extends IRocketChatRecord {
	rid: RoomID;
	msg: string;
	ts: Date;

	// TODO
	blocks?: any;
	private?: boolean;
	edited?: any;
	sentByEmail?: boolean;
	attachments?: any;
	avatar?: string;
	emoji?: string;
	file?: any;

	mid?: string;

	bot?: string;

	mentions?: {
		_id: string;
		type: MentionType;
		name?: string;
		username?: string;
	}[];
	channels?: Array<ChannelName>;
	u: Pick<IUser, '_id' | 'username' | 'name'>;

	_hidden?: boolean;
	imported?: boolean;
	replies?: IUser['_id'][];
	location?: {
		type: 'Point';
		coordinates: [string, string];
	};
	starred?: {_id: string}[];
	pinned?: boolean;
	drid?: RoomID;
	tlm?: Date;

	dlm?: Date;
	dcount?: number;
	tcount?: number;
	t?: string;
	e2e?: 'pending';
}
