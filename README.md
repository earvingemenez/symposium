# symposium

## Setup and Configuration

### Backend:
1. Setup virtualenv. this app uses `python3.7`
2. Clone the app
3. Activate the virtualenv and install the dependencies. `pip install -r requirements.txt`
4. run `python manage.py migrate`
5. run `python manage.py runserver`

### Frontend:
1. Go to `assets/fe`
2. run `npm install`
  2.1. create a symlink to the images and fonts from `assets/fe/src/assets/..` to `assets/..`
      - `sudo ln -s <path_to_base_dir>/assets/fe/src/assets/images <path_to_base_dir>/assets/`
      - `sudo ln -s <path_to_base_dir>/assets/fe/src/assets/fonts <path_to_base_dir>/assets/`
3. run `ng build --watch`

*Note:* Make Sure to create a `local_settings.py` containing the `DATABASES, DEBUG, ALLOWED_HOSTS, IS_PRODUCTION` for development use.
