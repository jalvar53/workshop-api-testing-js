const listPublicEventsSchema = [
  {
    'type': 'string',
    'public': 'boolean',
    'payload': {
    },
    'repo': {
      'id': 'number',
      'name': 'string',
      'url': 'string'
    },
    'actor': {
      'id': 'number',
      'login': 'string',
      'gravatar_id': 'string',
      'avatar_url': 'string',
      'url': 'string'
    },
    'org': {
      'id': 'number',
      'login': 'string',
      'gravatar_id': 'string',
      'url': 'string',
      'avatar_url': 'string'
    },
    'created_at': 'string',
    'id': 'string'
  }
];
    

module.exports.listPublicEventsSchema = listPublicEventsSchema;