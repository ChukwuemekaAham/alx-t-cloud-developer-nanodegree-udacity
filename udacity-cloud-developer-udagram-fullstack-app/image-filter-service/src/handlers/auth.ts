import express from 'express';
import { ParamsBase, QueryBase, RequestBase, ResponseBase } from "../models";
import { config } from '../config';
import * as jwt from 'jsonwebtoken';

const requireAuth: express.RequestHandler<ParamsBase, ResponseBase, RequestBase, QueryBase> = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({
            success: false,
            message: 'No authorization headers.'
        });
    }

    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({
            success: false,
            message: 'Malformed token.'
        });
    }

    const token = tokenBearer[1];

    return jwt.verify(token, config.dev.jwtSecret!, (err) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Failed to authenticate.'
            });
        }
        return next();
    });
};

export { requireAuth };