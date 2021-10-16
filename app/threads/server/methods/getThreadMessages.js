import { Meteor } from 'meteor/meteor';

import { Messages, Rooms, Tasks } from '../../../models/server';
import { canAccessRoom } from '../../../authorization/server';
import { settings } from '../../../settings/server';
import { readThread } from '../functions';

const MAX_LIMIT = 100;

Meteor.methods({
	getThreadMessages({ tmid, limit, skip, taskRoom = false }) {
		if (limit > MAX_LIMIT) {
			throw new Meteor.Error('error-not-allowed', `max limit: ${ MAX_LIMIT }`, { method: 'getThreadMessages' });
		}

		if (!Meteor.userId() || !settings.get('Threads_enabled')) {
			throw new Meteor.Error('error-not-allowed', 'Threads Disabled', { method: 'getThreadMessages' });
		}

		let thread;
		if (!taskRoom) {
			thread = Messages.findOneById(tmid);
		} else {
			thread = Tasks.findOneById(tmid);
			thread.msg = thread.title;
		}

		if (!thread) {
			return [];
		}

		const user = Meteor.user();
		const room = Rooms.findOneById(thread.rid);

		if (!canAccessRoom(room, user)) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'getThreadMessages' });
		}

		readThread({ userId: user._id, rid: thread.rid, tmid });

		const result = Messages.findVisibleThreadByThreadId(tmid, { ...skip && { skip }, ...limit && { limit }, sort: { ts: -1 } }).fetch();

		return [thread, ...result];
	},
});
