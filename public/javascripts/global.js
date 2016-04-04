(function(){
	var edmData={};
	var jobnumber = '1628002';

	$(document).ready(function(){

		getJobNumber(popMain);
		getJobNumbers();

		bindItems();


	});

	function bindItems(){
		$('.js-producer').on('click', function(e){
			e.preventDefault();
			$.ajax({
				url: '/digitalproducer/' + jobnumber
			}).done(function(response){
				// console.log(response);
				$('.js-content').slideUp('fast',function(){
					$('.js-content').html('');
					$('.js-content').append(response)
					.slideDown('fast');
				});
			});
		});

		$('.cleancollection').on('click', function(e){
			e.preventDefault();
			$.ajax({
				url: '/clean'
			}).done(function(response){
				console.log(response);
			});
		});

		$('.add').on('click', function(e){
			e.preventDefault();
			addData();
		});

		$('.actionbuttons').on('click', '.edit,.send', function(evt){
			evt.preventDefault();
			performAction(evt);
		});
	}

	function performAction(e){
		var _this = $(e.target),
			_data = _this.data('team');
		if( _this.hasClass('edit') ){
			$('#inputName').val(_data.name);
			$('#inputEmail').val(_data.email);
		}
	}

	function getJobNumber(callback){
		$.ajax({
				url: '/jobnumbers/' + jobnumber,
				dataType: 'JSON',
			}).done(function(response){
				console.log(response);
				edmData = $.extend({},{},response);
				callback(response);
			});
	}

	// Gets all job numbers in qachecklist collection
	function getJobNumbers(callback){
		$.ajax({
				url: '/jobs',
				dataType: 'JSON',
			}).done(function(response){
				console.log(response);
			});
	}

	function popMain(data){
		if(typeof data === 'undefined' || data.length == 0) return;
		var _data = data[0];
		var stage = $('<a/>').text(_data.staging).attr({"href":_data.staging, "target":"_blank"});

		$('#date').text(_data.date);
		$('#jobnumber').text(_data.jobnumber);
		$('#jobname').text(_data.jobname);
		$('#staging').html(stage);
		if(typeof _data.emailtest == 'array') {
			var text;

			for (var i=0; i< _data.emailtest.length;i++){
				text += '<a href="'+_data.emailtest[i]+'" target="_blank" style="display:block;">'+_data.emailtest[i]+'</a>';
				$
			}
		} else {
			text = $('<a/>').text(_data.emailtest).attr({"href":_data.emailtest, "target":"_blank"})
		}
		$('#litmusacid').html(_data.emailtest.toLowerCase() == 'n/a' ? _data.emailtest : text);

		popQATeam(_data, _data._id);
	}

	function popQATeam(data){
		var teamdata = data.qateam,
			_qatable = $('#qateamlist table');
		for(var team in teamdata){
			var _row = _qatable.find('tr[data-team='+team+']');

			_row.find('.name').text(teamdata[team].name);
			_row.find('.email').text(teamdata[team].email);
			_row.find('.status').text(teamdata[team].status);
			_row.find('actionbuttons .edit').data('team', {'id':data._id, 'name':teamdata[team].name, 'team':team, 'email':teamdata[team].email });
			_row.find('actionbuttons .send').data('email',teamdata[team].email);

		}
	}


	/* THIS ONLY ADDS A DOCUMENT TO  qachecklist collection. */
	var newdata = { "date" : "29/03/06", "jobnumber" : "1628002", "jobname" : "Job 2", "staging" : "http://medibank.lav.net.au/1628002/", "emailtest": "N/A", "notes" : "", "qateam" : { "producer" : { "name" : "Annie Chan", "email" : "annie.c@lavender.ad", "status" : "Pending" }, "accountmanager" : { "name" : "", "email" : "", "status" : "" }, "frontendlead" : { "name" : "Donald Martinez", "email" : "donald.m@lavender.ad", "status" : "Pending" }, "creative" : { "name" : "Louis Wong", "email" : "louis.w@lavender.ad", "status" : "Pending" }, "leadproducer" : { "name" : "Annie Chan", "email" : "annie.c@lavender.ad", "status" : "Pending" } }, "checklist" : { "producer" : [ { "text" : "Ensure all images load and display correctly", "value" : null, "issues" : "" }, { "text" : "Ensure all images have Alt tags", "value" : null, "issues" : "" }, { "text" : "Check image usage for ALL assets", "value" : null, "issues" : "" }, { "text" : "Check content/copy is correct", "value" : null, "issues" : "" }, { "text" : "Check all links point correctly", "value" : null, "issues" : "" }, { "text" : "Check Litmus and/or Email on Acid reports", "value" : null, "issues" : "" }, { "text" : "Ensure Text Version has been created (if required)", "value" : null, "issues" : "" }, { "text" : "Ensure Online Version has been created (if required)", "value" : null, "issues" : "" }, { "text" : "Check HTML & Text versions have \'View Online\' link", "value" : null, "issues" : "" }, { "text" : "Check HTML & Text vesrions have \'Unsubscribe\' link", "value" : null, "issues" : "" }, { "text" : "Ensure variables are being populated with correct details", "value" : null, "issues" : "" }, { "text" : "Ensure links with variables contain correct data", "value" : null, "issues" : "" }, { "text" : "Ensure all links and click-throughs are tracked (for reporting purposes)", "value" : null, "issues" : "" }, { "text" : "Ensure subject line is correct", "value" : null, "issues" : "" } ], "creative" : [ { "text" : "Build meets design requirements", "value" : null, "issues" : "" }, { "text" : "Check copy is correct", "value" : null, "issues" : "" } ], "frontendlead" : [ { "text" : "Build meets design requirements", "value" : null, "issues" : "" }, { "text" : "Check Litmus and/or Email on Acid reports", "value" : null, "issues" : "" }, { "text" : "Validate HTML source code", "value" : null, "issues" : "" }, { "text" : "Ensure Raw development files are committed to Stash(GIT)/ checked in to TFS", "value" : null, "issues" : "" } ], "accountmanager" : [ { "text" : "Ensure all images load and display correctly", "value" : null, "issues" : "" }, { "text" : "Ensure all images have Alt tags", "value" : null, "issues" : "" }, { "text": "Check image usage for ALL assets", "value" : null, "issues" : "" }, { "text": "Check content/copy is correct", "value" : null, "issues" : "" }, { "text" : "Check all links point correctly", "value" : null, "issues" : "" }, { "text" : "Check Litmus and/or Email on Acid reports", "value" : null, "issues" : "" }, { "text" : "Ensure Text Version has been created (if required)", "value" : null, "issues" : "" }, { "text" : "Ensure Online Version has been created (if required)", "value" : null, "issues" : "" }, { "text" : "Check HTML & Text versions have \'View Online\' link", "value" : null, "issues" : "" }, { "text" : "Check HTML & Text vesrions have \'Unsubscribe\' link", "value" : null, "issues" : "" }, { "text" : "Ensure variables are being populated with correct details", "value" : null, "issues" : "" }, { "text" : "Ensure links with variables contain correct data", "value" : null, "issues" : "" }, { "text" : "Ensure all links and click-throughs are tracked (for reporting purposes)", "value" : null, "issues" : "" }, { "text": "Ensure subject line is correct", "value" : null, "issues" : "" } ], "leadproducer" : [ { "text" : "Ensure staging link is password protected for client approval (3rd party dispatch only)", "value" : null, "issues" : "" } ] } };

	function addData(){
		$.ajax({
	      type: 'POST',
	      data: JSON.stringify(newdata),
	      url: '/adddata',
	      dataType: 'JSON',
	      contentType: 'application/json; charset=utf-8'
	  }).done(function( response ) {
	      if (response.msg === '') {
	          console.log(response);
	      } else {
	          alert('Error message: ' + response.msg);
	      }
	  });
	}

})();