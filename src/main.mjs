'use strict';

import { DiscogsClient } from '@lionralfs/discogs-client';

import { default as eelog } from 'ee-log';

const releaseId = process.argv.slice(2,3);

let db = new DiscogsClient().database();
db.getRelease(releaseId).then(function ({ data }) {
  console.error("----------------------");
  console.error("id:       ", data['id']);
  console.error("released: ", data['year']);
  console.error("artist:   ", data['artists'][0]['name']);
  console.error("title:    ", data['title']);
  console.error("url:      ", data['resource_url']);
  console.error("label:    ", data['labels'][0]['name']);
  console.error("cat:      ", data['labels'][0]['catno']);
  console.error("----------------------");

  console.log("id,released,artist,title,url,label,cat");
  console.log(
    data['id'] + "," +
    data['year'] + "," +
    data['artists'][0]['name'] + "," +
    data['title'] + "," +
    data['resource_url'] + "," +
    data['labels'][0]['name'] + "," +
    data['labels'][0]['catno']
  )
});
