import { Migrations } from '../../../app/migrations/server';
import { Messages, Rooms } from '../../models';
import { trash } from '../../../app/models/server/models/_BaseDb';

Migrations.add({
	version: 192,
	up() {
		try {
			trash._dropIndex({ collection: 1 });
		} catch {
			//
		}

		Messages.tryDropIndex({ rid: 1, ts: 1 });

		Rooms.tryDropIndex({ 'tokenpass.tokens.token': 1 });
		Rooms.tryEnsureIndex({ 'tokenpass.tokens.token': 1 }, { sparse: true });

		Rooms.tryDropIndex({ default: 1 });
		Rooms.tryEnsureIndex({ default: 1 }, { sparse: true });

		Rooms.tryDropIndex({ featured: 1 });
		Rooms.tryEnsureIndex({ featured: 1 }, { sparse: true });

		Rooms.tryDropIndex({ muted: 1 });
		Rooms.tryEnsureIndex({ muted: 1 }, { sparse: true });
	},
});
