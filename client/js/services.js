app.service("EventService", function($http){
  return {
    getEvents: function(){
      return $http.get('/api/events');
    },
    addEvent: function(event){
      return $http.post('/api/events', event);
    },
    editEvent: function(event){
      return $http.put('/api/events/' + event._id, event);
    },
    getEvent: function(id){
      return $http.get('/api/events/'+ id);
    },
    deleteEvent: function(id){
      return $http.delete('/api/events/'+ id);
    }
  };
});