import Modeler from 'bpmn-js/lib/Modeler';

import PropertiesPanel from './properties-panel';

import customModdleExtension from './moddle/custom.json';

import diagramXML from './diagram.bpmn';

import minimapModule from 'diagram-js-minimap';
import originModule from 'diagram-js-origin';

import TreePanel from './tree-panel';

import ModelerHead from './modeler-head';

import { createStore } from 'redux';
import rootReducer from './reducers';

const $modelerContainer = document.querySelector('#modeler-container');
const $propertiesContainer = document.querySelector('#properties-container');
const $treeContainer = document.querySelector('#tree-container');
const $headContainer = document.querySelector('#head-container');

const modeler = new Modeler({
  container: $modelerContainer,
  additionalModules: [
    minimapModule,
    originModule
  ],
  moddleExtensions: {
    custom: customModdleExtension
  },
  keyboard: {
    bindTo: document.body
  }
});

const propertiesPanel = new PropertiesPanel({
  container: $propertiesContainer,
  modeler
});

modeler.importXML(diagramXML);

const store = createStore(rootReducer);

//add components
const treePanel = new TreePanel({
  container: $treeContainer,
  modeler,
  store
});

const modelerHead = ModelerHead({
  container: $headContainer,
  modeler,
  store
});
