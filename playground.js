
router.get('/api/v1/messages/unread', mailsController.getUnreadMails);
router.get('/api/v1/messages/sent', mailsController.getSentMails);
router.get('/api/v1/messages/:id', mailsController.getMail);
router.delete('/api/v1/messages/:id', mailsController.deleteMail);

  
