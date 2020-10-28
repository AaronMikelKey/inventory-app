var express = require('express');
var router = express.Router();

//Require controller modules
var case_controller = require('../controllers/caseController');
var cpu_controller = require('../controllers/cpuController');
var memory_controller = require('../controllers/memoryController');
var motherboard_controller = require('../controllers/motherboardController');
var peripheral_controller = require('../controllers/peripheralController');
var powerSupply_controller = require('../controllers/powerSupplyController');
var storage_controller = require('../controllers/storageController');
var videoCard_controller = require('../controllers/videoCardController');

/// CASE ROUTES ///

// GET catalog home page.
router.get('/', case_controller.index);

// GET request for creating a case. NOTE This must come before routes that display case (uses id).
router.get('/case/create', case_controller.case_create_get);

// POST request for creating case.
router.post('/case/create', case_controller.case_create_post);

// GET request to delete case.
router.get('/case/:id/delete', case_controller.case_delete_get);

// POST request to delete case.
router.post('/case/:id/delete', case_controller.case_delete_post);

// GET request to update case.
router.get('/case/:id/update', case_controller.case_update_get);

// POST request to update case.
router.post('/case/:id/update', case_controller.case_update_post);

// GET request for one case.
router.get('/case/:id', case_controller.case_detail);

// GET request for list of all case items.
router.get('/cases', case_controller.case_list);

/// CPU ROUTES ///

// GET request for creating a cpu. NOTE This must come before routes that display cpu (uses id).
router.get('/cpu/create', cpu_controller.cpu_create_get);

// POST request for creating cpu.
router.post('/cpu/create', cpu_controller.cpu_create_post);

// GET request to delete cpu.
router.get('/cpu/:id/delete', cpu_controller.cpu_delete_get);

// POST request to delete cpu.
router.post('/cpu/:id/delete', cpu_controller.cpu_delete_post);

// GET request to update cpu.
router.get('/cpu/:id/update', cpu_controller.cpu_update_get);

// POST request to update cpu.
router.post('/cpu/:id/update', cpu_controller.cpu_update_post);

// GET request for one cpu.
router.get('/cpu/:id', cpu_controller.cpu_detail);

// GET request for list of all cpu items.
router.get('/cpus', cpu_controller.cpu_list);

/// MEMORY ROUTES ///

// GET request for creating a memory. NOTE This must come before routes that display memory (uses id).
router.get('/memory/create', memory_controller.memory_create_get);

// POST request for creating memory.
router.post('/memory/create', memory_controller.memory_create_post);

// GET request to delete memory.
router.get('/memory/:id/delete', memory_controller.memory_delete_get);

// POST request to delete memory.
router.post('/memory/:id/delete', memory_controller.memory_delete_post);

// GET request to update memory.
router.get('/memory/:id/update', memory_controller.memory_update_get);

// POST request to update memory.
router.post('/memory/:id/update', memory_controller.memory_update_post);

// GET request for one memory.
router.get('/memory/:id', memory_controller.memory_detail);

// GET request for list of all memory items.
router.get('/memorys', memory_controller.memory_list);

/// MOTHERBOARD ROUTES ///

// GET request for creating a motherboard. NOTE This must come before routes that display motherboard (uses id).
router.get('/motherboard/create', motherboard_controller.motherboard_create_get);

// POST request for creating motherboard.
router.post('/motherboard/create', motherboard_controller.motherboard_create_post);

// GET request to delete motherboard.
router.get('/motherboard/:id/delete', motherboard_controller.motherboard_delete_get);

// POST request to delete motherboard.
router.post('/motherboard/:id/delete', motherboard_controller.motherboard_delete_post);

// GET request to update motherboard.
router.get('/motherboard/:id/update', motherboard_controller.motherboard_update_get);

// POST request to update motherboard.
router.post('/motherboard/:id/update', motherboard_controller.motherboard_update_post);

// GET request for one motherboard.
router.get('/motherboard/:id', motherboard_controller.motherboard_detail);

// GET request for list of all motherboard items.
router.get('/motherboards', motherboard_controller.motherboard_list);

/// PERIPHERAL ROUTES ///

// GET request for creating a peripheral. NOTE This must come before routes that display peripheral (uses id).
router.get('/peripheral/create', peripheral_controller.peripheral_create_get);

// POST request for creating peripheral.
router.post('/peripheral/create', peripheral_controller.peripheral_create_post);

// GET request to delete peripheral.
router.get('/peripheral/:id/delete', peripheral_controller.peripheral_delete_get);

// POST request to delete peripheral.
router.post('/peripheral/:id/delete', peripheral_controller.peripheral_delete_post);

// GET request to update peripheral.
router.get('/peripheral/:id/update', peripheral_controller.peripheral_update_get);

// POST request to update peripheral.
router.post('/peripheral/:id/update', peripheral_controller.peripheral_update_post);

// GET request for one peripheral.
router.get('/peripheral/:id', peripheral_controller.peripheral_detail);

// GET request for list of all peripheral items.
router.get('/peripherals', peripheral_controller.peripheral_list);

/// POWER SUPPLY ROUTES ///

// GET request for creating a powerSupply. NOTE This must come before routes that display powerSupply (uses id).
router.get('/powerSupply/create', powerSupply_controller.powerSupply_create_get);

// POST request for creating powerSupply.
router.post('/powerSupply/create', powerSupply_controller.powerSupply_create_post);

// GET request to delete powerSupply.
router.get('/powerSupply/:id/delete', powerSupply_controller.powerSupply_delete_get);

// POST request to delete powerSupply.
router.post('/powerSupply/:id/delete', powerSupply_controller.powerSupply_delete_post);

// GET request to update powerSupply.
router.get('/powerSupply/:id/update', powerSupply_controller.powerSupply_update_get);

// POST request to update powerSupply.
router.post('/powerSupply/:id/update', powerSupply_controller.powerSupply_update_post);

// GET request for one powerSupply.
router.get('/powerSupply/:id', powerSupply_controller.powerSupply_detail);

// GET request for list of all powerSupply items.
router.get('/powerSupplys', powerSupply_controller.powerSupply_list);

/// STORAGE ROUTES ///

// GET request for creating a storage. NOTE This must come before routes that display storage (uses id).
router.get('/storage/create', storage_controller.storage_create_get);

// POST request for creating storage.
router.post('/storage/create', storage_controller.storage_create_post);

// GET request to delete storage.
router.get('/storage/:id/delete', storage_controller.storage_delete_get);

// POST request to delete storage.
router.post('/storage/:id/delete', storage_controller.storage_delete_post);

// GET request to update storage.
router.get('/storage/:id/update', storage_controller.storage_update_get);

// POST request to update storage.
router.post('/storage/:id/update', storage_controller.storage_update_post);

// GET request for one storage.
router.get('/storage/:id', storage_controller.storage_detail);

// GET request for list of all storage items.
router.get('/storages', storage_controller.storage_list);


/// videoCard ROUTES ///

// GET request for creating a videoCard. NOTE This must come before routes that display videoCard (uses id).
router.get('/videoCard/create', videoCard_controller.videoCard_create_get);

// POST request for creating videoCard.
router.post('/videoCard/create', videoCard_controller.videoCard_create_post);

// GET request to delete videoCard.
router.get('/videoCard/:id/delete', videoCard_controller.videoCard_delete_get);

// POST request to delete videoCard.
router.post('/videoCard/:id/delete', videoCard_controller.videoCard_delete_post);

// GET request to update videoCard.
router.get('/videoCard/:id/update', videoCard_controller.videoCard_update_get);

// POST request to update videoCard.
router.post('/videoCard/:id/update', videoCard_controller.videoCard_update_post);

// GET request for one videoCard.
router.get('/videoCard/:id', videoCard_controller.videoCard_detail);

// GET request for list of all videoCard items.
router.get('/videoCards', videoCard_controller.videoCard_list);
module.exports = router;