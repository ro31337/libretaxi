Phantom actions are actions that are not accessible from the menu directly by
driver or passenger. These actions are called from the main loop, but usually
call is initiated by handler(s).

There are two differences between menu action and phantom action:

1. When posted to the queue, this action should have `once: true` parameter set.
   For such actions main loop provides empty `onResult` callback,
   so even if it's executed inside of response handler, no later response will
   be posted to the main loop.

   You can think about these actions as one-time actions. Phantom action will be
   handled only once. But menu action will be handled infinite amount of times.

2. This action should override `call` method only, because there is no difference
   between get and post for phantom action, it's just executed.

Note that phantom actions usually don't redirect. While menu actions usually
redirect to another actions.
