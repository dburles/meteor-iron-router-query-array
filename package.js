Package.describe({
  name: 'dburles:iron-router-query-array',
  summary: 'Iron Router addon that allows control of query string arrays',
  version: '1.0.0',
  git: 'https://github.com/dburles/meteor-iron-router-query-array.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['underscore', 'iron:router@1.0.6']);
  api.addFiles('iron-router-query-array.js');
});
