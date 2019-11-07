$(function() {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

    $('#spendAmount').click(function() {
        chrome.storage.sync.get('total', function(budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }
            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({ 'total': newTotal }, function() {
                console.log("@@@");
                if (newTotal >= budget.limit) {
                    console.log("***");
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: "You have raached your limit!",
                    };
                    chrome.notifications.create('limitNotif', notifOptions);

                }
            });
            $('#total').text(newTotal);
            $('#amount').val('');
        });


    });
})