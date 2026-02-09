import { ticketService } from '../services/ticket.service.js';

export const getAll = async (req, res) => {
  try {
    const tickets = await ticketService.getAll();

    return res.status(200).json({
      status: 'success',
      count: tickets.length,
      tickets
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getById = async (req, res) => {
  try {
    const { tid } = req.params;

    const ticket = await ticketService.getById(tid);

    return res.status(200).json({
      status: 'success',
      ticket
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getByPurchaser = async (req, res) => {
  try {
    const { email } = req.params;

    const tickets = await ticketService.getByPurchaser(email);

    return res.status(200).json({
      status: 'success',
      count: tickets.length,
      tickets
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getByUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const tickets = await ticketService.getByUser(uid);

    return res.status(200).json({
      status: 'success',
      count: tickets.length,
      tickets
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: 'error',
        error: 'El campo userId es requerido'
      });
    }

    const result = await ticketService.purchaseCart(cid, userId);

    if (result.productsNotProcessed.length > 0) {
      return res.status(200).json({
        status: 'partial',
        message: 'Compra completada parcialmente',
        ticket: result.ticket,
        productsNotProcessed: result.productsNotProcessed
      });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Compra completada exitosamente',
      ticket: result.ticket
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { tid } = req.params;

    await ticketService.deleteTicket(tid);

    return res.status(200).json({
      status: 'success',
      message: 'Ticket eliminado exitosamente'
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};