/**
 * Created by kshitiz on 5/6/15.
 */

var Data = require('../models/data').Data;
module.exports = DataDao = {};

/**
 *
 * @param data
 * @param cb
 */
DataDao.addNew = function (data, cb) {

  var dataInfo = {
    bytesLeft: parseFloat(data.bytesLeft),
    date: new Date()
  };

  var newData = new Data(dataInfo);

  if (!cb) cb = function (err, result) {};

  newData.save(function (err, result) {
    if (err) {
      cb(err);
      console.error("Error in saving listicle = ", err);
    } else {
      cb(null, result);
    }
  });
};

/**
 *
 * @param cb
 */
DataDao.getAll = function (cb) {
  Data.find({}, function (err, results) {
    if (err) {
      cb(err);
      console.error("Error in saving listicle = ", err)
    }

    cb(null, results);
  })
};

/**
 *
 * @param listId
 */
DataDao.getById = function (listId, cb) {
  Data.find({_id: listId}, function (err, docs) {
    if (err) {
      cb(err);
      console.error("Error in finding listicle = ", err)
    } else if (docs && docs.length == 0) {
      cb(null, null);
    } else {
      cb(null, docs[0]);
    }
  });
};

/**
 *
 * @param listId
 */
DataDao.editById = function (listId, data, cb) {
  var options = {};

  var listicleData = {
    urlSuffix: data.urlSuffix,
    title: data.title,
    author: data.author,
    mainImage: data.mainImage,
    description: data.description,
    status: data.status,
    createDate: data.createDate,
    publishDate: data.publishDate,
    visible: data.visible,
    tags: data.tags ? data.tags.split(',') : null,
    keywords: data.keywords ? data.keywords.split(',') : null,
    items: data.itemArr
  };

  Data.findOneAndUpdate({_id: listId}, listicleData, options, function (err, docs) {
    if (err) {
      cb(err);
      console.error("Error in finding listicle = ", err)
    } else if (!docs) {
      cb(null, null);
    } else {
      cb(null, docs);
    }
  });
};


/**
 *
 * @param listId
 */
DataDao.deleteById = function (listId, cb) {
  console.log("ID = ", listId)
  Data.remove({_id: listId}, function (err) {
    if (err) {
      cb(err);
      console.error("Error in deleting listicle = ", err)
    } else {
      cb();
    }
  });
};