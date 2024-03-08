console.log('app.js is loaded!');

// console.log(jQuery, $);

/**
 * Button to show ALL USERS!
 */
const $button = $('#show-user-button');
console.log('Do we have the $button?', $button);
$button.on('click', () => {
    console.log('Button was clicked!');
    $button.attr('disabled', true);

    $.ajax('http://localhost:8080/api/users/', {
        success: (response) => {
            console.log('response', response);

            const $ul = $('<ul></ul>');

            for(const username in response) {
                const user = response[username];
                $ul.append(`
                    <li>
                        <dl>
                            <dt>Username</dt>
                            <dd>${username}</dd>
                            <dt>E-Mail</dt>
                            <dd>${user.email}</dd>
                            <dt>School</dt>
                            <dd>${user.school}</dd>
                        </dl>
                    </li>
                `);
            }

            $('body').append($ul);
            $button.remove();
        },
        failure: (error) => {
            console.log('failure, error:', error);
        }
    })
});

/**
 * Form to CREATE NEW USER!
 */
const $form          = $('#add-user-form');
const $usernameField = $('#add-user-form-username');
const $emailField    = $('#add-user-form-email');
const $password      = $('#add-user-form-password');
const $school        = $('#add-user-form-school');
$form.on('submit', (event) => {
    event.preventDefault(); // Don't allow a new pageload! Let's keep it SPA!

    $.ajax('/api/users/', {
        method: 'POST',
        data: {
            username: $usernameField.val(),
            email:    $emailField.val(),
            password: $password.val(),
            school:   $school.val()
        },
        success: (response) => {
            console.log('form submit response:', response);

            // Try and be more DRY than this. Wrap this in a re-usable function!
            $.ajax('http://localhost:8080/api/users/', {
                success: (response) => {
                    console.log('response', response);

                    const $oldUl = $('ul');
                    if($oldUl.length > 0) $oldUl.remove();

                    const $ul = $('<ul></ul>');

                    for(const username in response) {
                        const user = response[username];
                        $ul.append(`
                            <li>
                                <dl>
                                    <dt>Username</dt>
                                    <dd>${username}</dd>
                                    <dt>E-Mail</dt>
                                    <dd>${user.email}</dd>
                                    <dt>School</dt>
                                    <dd>${user.school}</dd>
                                </dl>
                            </li>
                        `);
                    }

                    $('body').append($ul);
                    $button.remove();
                },
                failure: (error) => {
                    console.log('failure, error:', error);
                }
            });
        },
        failure: (error) => {
            console.log('failure, error:', error);
        }
    });
});

