#!/usr/bin/env node

'use strict';

import { DiscogsClient } from '@lionralfs/discogs-client';

import { spawn } from 'node:child_process';

const releaseId = process.argv.slice(2,3);

const glabelsPrinter = process.env['GLABELS_PRINTER'] || 'file';
const glabelsBatchBin = process.env['GLABELS_BATCH_BIN'] || 'glabels-batch-qt';
const glabelsTemplateFile = process.env['GLABELS_TEMPLATE_FILE'] || `${process.cwd()}/templates/album_labels.glabels`;

let db = new DiscogsClient().database();
db.getRelease(releaseId).then(function ({ data }) {
  console.error("----------------------");
  console.error("id:       ", data['id']);
  console.error("released: ", data['year']);
  console.error("artist:   ", data['artists'][0]['name']);
  console.error("title:    ", data['title']);
  console.error("url:      ", data['uri']);
  console.error("label:    ", data['labels'][0]['name']);
  console.error("cat:      ", data['labels'][0]['catno']);
  console.error("----------------------");

  console.error(`${glabelsBatchBin} \
--printer=${glabelsPrinter} \
--define=artist=${data['artists'][0]['name']} \
--define=title=${data['title']} \
--define=released=${data['year']} \
--define=label=${data['labels'][0]['name']} \
--define=cat=${data['labels'][0]['catno']} \
--define=url=${data['uri']} \
${glabelsTemplateFile}
`)

  const glabelsExe = spawn(glabelsBatchBin, [
    `--printer=${glabelsPrinter}`,
    `--define=artist=${data['artists'][0]['name']}`,
    `--define=title=${data['title']}`,
    `--define=released=${data['year']}`,
    `--define=label=${data['labels'][0]['name']}`,
    `--define=cat=${data['labels'][0]['catno']}`,
    `--define=url=${data['uri']}`,
    `${glabelsTemplateFile}`,
  ]);

  glabelsExe.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  glabelsExe.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  glabelsExe.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
