'use strict';

var app = app || {};

(function (module) {
    function Results(resultsData) {
        Object.keys(resultsData).forEach(key => this[key] = resultsData[key]);
    }

    Results.all = [];

    Results.loadAll = rows => {
        // rows.sort((a,b) => (new Date(b.publishedAt)) - (new Date(a.publishedAt)));
        Results.all = rows.map(obj => new Results(obj));
    };

    Results.fetchAll = callback => {
        $.get('/sources')
            .then(
            results => {
                Results.loadAll(results);
                callback();
            }
            )
            .then(Results.createChart);
    };

    // COMMENT: Do we want to use this?
    // Results.truncateTable = callback => {
    //     $.ajax({
    //         url: '/articles',
    //         method: 'DELETE',
    //     })
    //         .then(console.log)
    //         .then(callback);
    // };



    // COMMENT: Do we need a deleteRecord method?
    // Results.prototype.deleteRecord = function(callback) {
    //     $.ajax({
    //         url: ''
    //     })
    // }
    // COMMENT: Do we need an updateRecord method?
    // Results.prototype.updateRecord = function(callback) {}


    Results.createChart = function () {
        var canvas = $('#results-chart').get(0);

        var pieChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Left', 'Center Left', 'Center', 'Center Right', 'Right'],
                datasets: [{
                    label: 'User Votes',
                    data: [app.selectedObj.voteLeft,app.selectedObj.voteCenterLeft, app.selectedObj.voteCenter, app.selectedObj.voteCenterRight, app.selectedObj.voteRight],
                    backgroundColor: ['#0e51a7', '#6997d3', '#ad66d5', '#ff7d73', '#ff1300']
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Results'
                },
                responsive: false,
                maintainAspectRatio: true,
            }



        });
    }





    module.Results = Results;
}(app));