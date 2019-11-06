$(function() {

    chrome.storage.sync.get('limit', function(budget) {
        var limit = budget.limit;
        $('#limit').val(limit);
    });
    $('#saveLimit').click(function() {
        var limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({
                'limit': limit
            }, function() {
                close();
            });

        }
    });
    $('#resetTotal').click(function() {
        chrome.storage.sync.set({ 'total': 0 }, function() {
            var resetNotifi = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Rest Notification',
                message: 'Total Reseted'
            }
            chrome.notifications.create('resetNotifi', resetNotifi);
        });
    });
})