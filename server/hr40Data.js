// run mysql -u root < schema.sql 
// before running this script!

var Promise = require('bluebird');
var studentFile = require('./studentData');
var request = require('request');
var db = require('./dbConfig');
var Users = require('./collections/users');
var Groups = require('./collections/groups');
var Group = require('./models/group');

var groups = ['hr36', 'hr37', 'hr38', 'hr39', 'hr40', 'hr41'];
var students = [];

for (var group in studentFile.students) {
  var people = studentFile.students[group];
  people.forEach(function(person) {
    var lower = person.name.toLowerCase();
    var splitName = lower.split(' ');
    person.image = '/assets/' + splitName[0] + '-' + splitName[1] + '.jpg';
    students.push(person);
  });
}

Promise.each(groups, function(group) {
  return Groups
    .create({group_name: group});
})
.then(function(groups) {
  return Promise.each(students, function(student) {
    return Group
      .where({group_name: 'hr' + student.cohort})
      .fetch()
      .then(function(group) {
        return Users
          .create({
            username: student.name,
            password: 'password',
            email: 'email@mail.com',
            image: student.image,
            Group_id: group.id,
            public: 0,
            permission: 0
          }); 
        
      });

  });
}).then(function() {
  console.log('done!');
  db.knex.destroy();
});