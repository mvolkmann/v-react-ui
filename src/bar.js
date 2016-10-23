import React from 'react';
import util from './util';
util.hello = util.hello.bind(null, 'Bar');

export default () => <h1>{util.hello()}</h1>;
