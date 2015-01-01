var go = function(query) {
  Router.go(Router.current().route.getName(), Router.current().params, {
    query: query,
    hash: Router.current().params.hash
  });
};

Router.query = {
  add: function(name, value) {
    var query = EJSON.clone(Router.current().params.query);

    if (! query[name])
      query[name] = [value];
    else {
      if (! _.isArray(query[name]))
        query[name] = [query[name]];

      if (_.indexOf(query[name], value) === -1)
        query[name].push(value);
    }

    go(query);
  },
  remove: function(name, value) {
    var query = EJSON.clone(Router.current().params.query);
    query[name] = _.without(query[name], value);

    go(query);
  },
  isSet: function(name, value) {
    var query = Router.current().params.query;
    return !! (query[name] && _.indexOf(query[name], value) !== -1);
  },
  clear: function() {
    go({});
  }
};
