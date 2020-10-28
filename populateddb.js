#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

//P MUCH NEED TO REWRITE ALL OF THIS TO FIT THE DB FOR THE INVENTORY APP


var async = require('async')
var Case = require('./models/case')
var Cpu = require('./models/cpu')
var Memory = require('./models/memory')
var Motherboard = require('./models/motherboard')
var Peripheral = require('./models/peripheral')
var PowerSupply = require('./models/powerSupply')
var Storage = require('./models/storage')
var VideoCard = require('./models/videoCard')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cases = []
var cpus = []
var memorys = []
var motherboards = []
var peripherals = []
var powerSupplys = []
var storages = []
var videoCards = []

function pcCaseCreate(name, manufacturer, type, color, price, amount, cb) {
  casedetail = {name:name , manufacturer: manufacturer, type: type, color: color, price: price, amount: amount }
  
  var pcCase = new Case(casedetail);
       
  pcCase.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Case: ' + pcCase);
    cases.push(pcCase)
    cb(null, pcCase)
  }  );
}

function cpuCreate(name, manufacturer, coreCount, coreClock, price, amount, cb) {
  var cpu = new Cpu({ name: name, manufacturer: manufacturer, coreCount: coreCount, coreClock: coreClock, price: price, amount: amount  });
       
  cpu.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Cpu: ' + cpu);
    cpus.push(cpu)
    cb(null, cpu);
  }   );
}

function memoryCreate(name, manufacturer, type, size, color, price, amount, cb) {
  var memory = new Memory({ name: name, manufacturer: manufacturer, type: type, size: size, color: color, price: price, amount: amount });
       
  memory.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Memory: ' + memory);
    memorys.push(memory)
    cb(null, memory);
  }   );
}

function motherboardCreate(name, manufacturer, formFactor, memory, price, amount, cb) {
  var motherboard = new Motherboard({ name: name, manufacturer: manufacturer, formFactor: formFactor, memory: memory, price: price, amount: amount  });
       
  motherboard.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New motherboard: ' + motherboard);
    motherboards.push(motherboard)
    cb(null, motherboard);
  }   );
}

function peripheralCreate(name, manufacturer, description, type, price, amount, cb) {
  var peripheral = new Peripheral({ name: name, manufacturer: manufacturer, description: description, type: type, price: price, amount: amount  });
       
  peripheral.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Cpu: ' + peripheral);
    peripherals.push(peripheral)
    cb(null, peripheral);
  }   );
}

function powerSupplyCreate(name, manufacturer, modular, color, wattage, price, amount, cb) {
  var powerSupply = new PowerSupply({ name: name, manufacturer: manufacturer, modular: modular, color: color, wattage: wattage, price: price, amount: amount  });
       
  powerSupply.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New powerSupply: ' + powerSupply);
    powerSupplys.push(powerSupply)
    cb(null, powerSupply);
  }   );
}

function storageCreate(name, manufacturer, type, capacity, price, amount, cb) {
  var storage = new Storage({ name: name, manufacturer: manufacturer, type: type, capacity: capacity, price: price, amount: amount  });
       
  storage.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Storage: ' + storage);
    storages.push(storage)
    cb(null, storage);
  }   );
}

function videoCardCreate(name, manufacturer, memory, chipset, price, amount, cb) {
  var videoCard = new VideoCard({ name: name, manufacturer: manufacturer, memory: memory, chipset: chipset, price: price, amount: amount  });
       
  videoCard.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New VideoCard: ' + videoCard);
    videoCards.push(videoCard)
    cb(null, videoCard);
  }   );
}

function createPCCases(cb) {
    async.series([
        function(callback) {
          pcCaseCreate('H510', 'NZXT', 'ATX Mid Tower', 'White', 6999, 6, callback);
        },
        function(callback) {
          pcCaseCreate('Meshify C', 'Fractal Design', 'ATX Mid Tower', 'Black', 9789, 4, callback);
        },
        function(callback) {
          pcCaseCreate('PC-O11 Dynamic', 'Lian Li', 'ATX Full Tower', 'Black', 13999, 3, callback);
        },
        function(callback) {
          pcCaseCreate('MasterBox Q300L', 'Cooler Master', 'ATX Mini Tower', 'Black', 4449, 6, callback);
        },
        function(callback) {
          pcCaseCreate('GD09B', 'Silverstone', 'HTPC', 'Black', 9399, 2, callback);
        },
        ],
        // optional callback
        cb);
}


function createCpus(cb) {
    async.parallel([
        function(callback) {
          cpuCreate('Ryzen 5 3600', 'AMD', 6, 36, 19999, 5, callback);
        },
        function(callback) {
          cpuCreate('Ryzen 7 3700X', 'AMD', 8, 36, 30999, 4, callback);
        },
        function(callback) {
          cpuCreate('Ryzen 9 3900X', 'AMD', 12, 38, 43999, 4, callback);
        },
        function(callback) {
          cpuCreate('Core i7-9700K', 'Intel', 8, 36, 29999, 6, callback);
        },
        function(callback) {
          cpuCreate('Core i7-10700K', 'Intel', 8, 38, 37777, 3, callback);
        },
        function(callback) {
          cpuCreate('Core i9-10900K', 'Intel', 10, 37, 52999, 5, callback);
        },
        function(callback) {
          cpuCreate('Threadripper 3990X', 'AMD', 64, 29, 384999, 6, callback);
        }
        ],
        // optional callback
        cb);
}

function createMotherboards(cb) {
  async.parallel([
      function(callback) {
        motherboardCreate('B450 TOMAHAWK MAX', 'MSI', 'ATX', 'DDR4', 11499, 3, callback)
      },
      function(callback) {
        motherboardCreate('B450M', 'Gigabyte', 'Micro ATX', 'DDR4', 7198, 6, callback)
      },
      function(callback) {
        motherboardCreate('Z390-A PRO', 'MSI', 'ATX', 'DDR4', 11999, 5, callback)
      },
      function(callback) {
        motherboardCreate('ROG Strix X570-I Gaming', 'Asus', 'Mini ITX', 'DDR4', 24596, 1, callback)
      },
      function(callback) {
        motherboardCreate('270-WS-W555-A1', 'EVGA', 'HTPX', 'DDR3', 39206, 2, callback)
      },
      function(callback) {
        motherboardCreate('MEG X570 UNIFY', 'MSI', 'ATX', 'DDR4', 29999, 4, callback)
      }
      ],
      // Optional callback
      cb);
}

function createMemorys(cb) {
    async.parallel([
        function(callback) {
          memoryCreate('Vengeance LPX', 'Corsair', 'DDR4', '16GB', 'Yellow', 6898, 6, callback)
        },
        function(callback) {
          memoryCreate('Vengeance RGB Pro', 'Corsair', 'DDR4', '32GB', 'RGB', 14299, 4, callback)
        },
        function(callback) {
          memoryCreate('Ripjaws V', 'G. Skill', 'DDR4', '16GB', 'Black', 7898, 6, callback)
        },
        function(callback) {
          memoryCreate('Trident Z Neo', 'G. Skill', 'DDR4', '32GB', 'White', 17398, 6, callback)
        },
        function(callback) {
          memoryCreate('HyperX Fury', 'Kingston', 'DDR4', '16GB', 'Red', 6898, 6, callback)
        },
        function(callback) {
          memoryCreate('ValueRam', 'Kingston', 'DDR2', '1GB', 'Green', 999, 10, callback)
        },
        function(callback) {
          memoryCreate('Viper Steel', 'Patriot', 'DDR3', '8GB', 'Green', 2998, 4, callback)
        },
        function(callback) {
          memoryCreate('T-Force VULCAN Z', 'Team', 'DDR4', '8GB', 'Red', 2998, 8, callback)
        },
        function(callback) {
          memoryCreate('CT25664BA1339', 'Crucial', 'DDR3', '2GB', 'Green', 1000, 4, callback)
        },
        function(callback) {
          memoryCreate('Aegis', 'G. Skill', 'DDR4', '4GB', 'Black', 1799, 8, callback)
        }
        ],
        // Optional callback
        cb);
}

function createPeripherals(cb) {
  async.parallel([
      function(callback) {
        peripheralCreate('Odyssey G9', 'Samsung', '49in 5120x1440 240Hz Curved Screen', 'Monitor', 134999, 2, callback)
      },
      function(callback) {
        peripheralCreate('TUF Gaming VG27AQ', 'ASUS', '27in 2560x1440 165Hz Wide Screen', 'Monitor', 42499, 4, callback)
      },
      function(callback) {
        peripheralCreate('HyperX Cloud II', 'Kingston', 'Closed enclosure Circumaural', 'Headphones', 9299, 5, callback)
      },
      function(callback) {
        peripheralCreate('Kraken X', 'Razer', 'Closed enclosure Circumaural', 'Headphones', 4999, 7, callback)
      },
      function(callback) {
        peripheralCreate('K55', 'Corsair', 'RGB Backlit Wired Mechanical', 'Keyboard', 4988, 3, callback)
      },
      function(callback) {
        peripheralCreate('G710 Plus', 'Logitech', 'White Backlit Cherry MX Brown', 'Keyboard', 21500, 3, callback)
      },
      function(callback) {
        peripheralCreate('G502 HERO', 'Logitech', 'Optical Wired 16000DPI', 'Mouse', 4858, 2, callback)
      },
      function(callback) {
        peripheralCreate('Naga Hex V2', 'Razer', 'Laser Wired 16000DPI', 'Mouse', 25500, 3, callback)
      },
      function(callback) {
        peripheralCreate('THX-Z-5300e', 'Logitech', '5.1  280 W', 'Speakers', 135806, 1, callback)
      },
      function(callback) {
        peripheralCreate('Pebble 2.0', 'Creative Labs', '2.0 4.4 W', 'Speakers', 2298, 12, callback)
      }
      ],
      // Optional callback
      cb);
}

function createPowerSupplys(cb) {
  async.parallel([
      function(callback) {
        powerSupplyCreate('MWE Gold', 'Cooler Master', 'Full', 'Black', 650, 10598, 3, callback)
      },
      function(callback) {
        powerSupplyCreate('BR', 'EVGA', 'No', 'Black', 500, 4999, 2, callback)
      },
      function(callback) {
        powerSupplyCreate('ROG-THOR-1200P', 'ASUS', 'Full', 'Black', 1200, 3806, 1, callback)
      },
      function(callback) {
        powerSupplyCreate('RMx', 'Corsair', 'Full', 'Black', 1000, 20499, 1, callback)
      },
      function(callback) {
        powerSupplyCreate('Smart Series', 'Thermaltake', 'No', 'Black', 430, 4299, 2, callback)
      },
      function(callback) {
        powerSupplyCreate('FOCUS Plus Gold', 'SeaSonic', 'Full', 'Black', 850, 18199, 1, callback)
      }
      ],
      // Optional callback
      cb);
}

function createStorages(cb) {
  async.parallel([
      function(callback) {
        storageCreate('Barracuda Compute', 'Seagate', '7200RPM', '2TB', 5499, 2, callback)
      },
      function(callback) {
        storageCreate('970 Evo', 'Samsung', 'SSD', '1TB', 14999, 4, callback)
      },
      function(callback) {
        storageCreate('Blue', 'Western Digital', '7200RPM', '1TB', 4499, 3, callback)
      },
      function(callback) {
        storageCreate('860 Evo', 'Samsung', 'SSD', '1TB', 11496, 1, callback)
      },
      function(callback) {
        storageCreate('A400', 'Kingston', 'SSD', '256GB', 2799, 5, callback)
      },
      function(callback) {
        storageCreate('Red', 'Western Digital', '5400RPM', '4TB', 9599, 8, callback)
      },
      function(callback) {
        storageCreate('SV35.5', 'Seagate', '5900RPM', '512GB', 3499, 3, callback)
      },
      function(callback) {
        storageCreate('Nytro Enterprise', 'Seagate', 'SSD', '16TB', 549500, 12, callback)
      },
      function(callback) {
        storageCreate('XPG SX8200 Pro', 'ADATA', 'SSD', '1TB', 12999, 4, callback)
      },
      function(callback) {
        storageCreate('Ultra Plus', 'SanDisk', 'SSD', '256GB', 14294, 1, callback)
      }
      ],
      // Optional callback
      cb);
}

function createVideoCards(cb) {
  async.parallel([
      function(callback) {
        videoCardCreate('Founders Edition', 'NVIDIA', '10GB', 'GeForce RTX 3080', 699, 3, callback)
      },
      function(callback) {
        videoCardCreate('KO GAMING', 'ASUS', '8GB', 'GeForce RTX 2060', 36294, 2, callback)
      },
      function(callback) {
        videoCardCreate('GAMING X', 'MSI', '6GB', 'GeForce GTX 1660 Ti', 26499, 1, callback)
      },
      function(callback) {
        videoCardCreate('DUAL EVO OC', 'ASUS', '8GB', 'Radeon RX 5700', 67595, 3, callback)
      },
      function(callback) {
        videoCardCreate('WINDFORCE OC', 'Gigabyte', '6GB', 'GeForce RTX 2060', 39900, 1, callback)
      }
      ],
      // Optional callback
      cb);
}


async.series([
    createPCCases,
    createCpus,
    createMotherboards,
    createMemorys,
    createPeripherals,
    createPowerSupplys,
    createStorages,
    createVideoCards
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('CPUs: '+cpus);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
}); 