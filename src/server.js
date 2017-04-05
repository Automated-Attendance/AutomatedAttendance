import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import Auth0Strategy from './auth/Auth0';

dotenv.load();

import routes from './routes/index';