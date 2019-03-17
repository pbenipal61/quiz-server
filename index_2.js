'use strict';

function approveDomains(opts, certs, cb) {

    console.log(opts);
    if (!/^(www\.)?test\.ppl\.family$/.test(opts.domains)) {  //TODO


        cb("No config found for '" + opts.domain + "'");
        return;
    }

    opts.email = 'prabhjotbenipal97@gmail.com';
    opts.agreeTos = true;
    opts.domains = [];  //DOMAIN NAME HERE //TODO

    cb(null, { options: opts, certs: certs });
}

require('greenlock-express').create({


    version: 'draft-11'

    , server: 'https://acme-staging-v02.api.letsencrypt.org/directory'

    , approvedDomains: function (opts, certs, cb) {
        approvedDomains(opts, certs, cb);
    }


    , configDir: '~/.config/acme/'

    , app: require('express')().use('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('Hello, World!\n\n💚 🔒.js');
    })


    , communityMember: true



}).listen(80, 443);