# Requirements achieved

- Clerk is used to manage access to the app. I've applied it to the whole app as it's quite usual to have to log in to social media platforms in order to see anything at all.
- I've added a not-found page for in-existent users on the dynamic users/id route, that gives a 404 for numbers or strings that aren't people.
- I've used several Radix components and icons. Tabs, dropdowns, alert dialog etc.
- Users can enter and update their own display name and bio section. Users and user information are stored in their own table in the database and handled with an appropriate route for their individual pages (i.e. /user/[id]).
- Users can create posts associated with their ClerkID and UserID which appear on their own User Page (My Blog). This is from the homepage and their user page via a modal (click the big pencil).

- User can update their posts from the ... menu on their user page
- Users can delete their posts with the ... menu on their user page, and their replies by clicking the trashcan next to the reply.
- Users can view other profiles directly from posts they see on the global timeline, using a dynamic users route. Link from the name in a post or reply.
- Users follow each other by establishing a follower and followee relationship between profiles. Posts by the followed appear on their own tab on the Homepage (the default view).
- When a user first logs on, a record is created for them in the database with a placeholder name and bio that encourages them to edit with their own info. They do this by clicking on it in the header on their user page.

## Other bits

Users can 'reblog' another users post on their own page. This effectively copies the original post and reposts it under the user's name, so that their followers will see it on their front page. Users aren't able to edit the content of posts they reblog, and these posts also show the original posters name. Tumblr, OK.

Users can reply to posts via the ... menu

There's a side-panel which doesn't have a lot on it right now except for the Clerk userbutton (so they can log out) and a count of how many people they're following.

# Reflections

At the end of Friday afternoon I was feeling I'd bitten off way more that I could chew and I wasn't going to get half of what I wanted actually functioning. In the end I got most of what I was after, at least for this weekend, but it was tough to get it all in in the time I had.

## Styling

I hope you were OK with last week's look because it's the same this week. I didn't have the inventiveness to put towards something new. Also, light mode is kind of rushed I know - I'm a dark mode user so I know it gets more attention. If I'd had more time I'd have put more effort into making light mode look nicer, as it is I've tried to make sure it at least works (no white test on white backgrounds!)

One thing that's obviously missing is a true desktop layout. I wanted to do one that was properly desktop, not the mobile stretched, but there weren't enough hours in the days.

## Missing features

I made a table for likes at the start when I was being over-ambitious, but nothing ever happened to it. You've got re-blogs and that will have to do - the algo ignores likes anyway... (there is no algo).

Search - I really wanted a separate page for search results to allow a search by tag but this never happened. It feels like the biggest ommision from the basic functions. Again, ran out of time.

## Niggles

The whole tag system is still pretty ... flakey. It probably needs revisiting and re-SQLing to make it more robust. It kind of works? When it works...
