/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	sms: function(req, res) {
		var id = req.params.all().id;

		if(!id) {
			return res.badRequest('Missing contact `id`');
		}

		sails.models.contact.findOne(id).exec(function(err, contact) {
			if(err) {
				return res.serverError(err);
			}
			if(!contact) {
				return res.notFound('Contact with id `' + id + '` not found.');
			}
			if(!contact.phone) {
				return res.badRequest('No phone number found for ' + contact.name);
			}
			return res.ok('SMS sent to ' + contact.name);
		});
	}
};

