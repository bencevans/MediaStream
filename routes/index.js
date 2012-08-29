
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'MediaSocket' });
};

exports.test = function(req, res){
  res.render('test', { title: 'MediaSocket' });
};