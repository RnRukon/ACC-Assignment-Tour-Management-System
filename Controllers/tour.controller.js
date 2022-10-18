const { getToursServices, createToursServices, updateToursServices, deleteToursByIdServices, detailsToursByIdServices, getToursTrendingServices, getToursCheapestServices } = require("../Services/Tours.Services");


exports.getTours = async (req, res, next) => {

    try {

        let filters = { ...req.query };

        let filterString = JSON.stringify(filters);

        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        const parseFilter = JSON.parse(filterString);
        filters = parseFilter;


        //sort limit page =>exclude
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(filed => delete filters[filed]);

        const queries = {};
        if (req.query.sort) {
            const sortBy = req?.query?.sort?.split(',').join(' ');
            queries.sortBy = sortBy;

        }

        if (req.query.fields) {
            const fields = req?.query?.fields?.split(',').join(' ');
            queries.fields = fields;

        }

        // pagination 
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit)
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const result = await getToursServices(filters, queries);
        res.status(200).json({
            status: "Success",
            message: "Get data successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "can  not get data successfully",
            error: error.message
        });
    }
}


exports.getToursTrendingView = async (req, res, next) => {

    try {

        const result = await getToursTrendingServices();
        res.status(200).json({
            status: "Success",
            message: "Get data successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "can  not get data successfully",
            error: error.message
        });
    }
}
exports.getToursCheapestView = async (req, res, next) => {

    try {

        const result = await getToursCheapestServices();
        res.status(200).json({
            status: "Success",
            message: "Get data successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "can  not get data successfully",
            error: error.message
        });
    }
}
exports.getToursDetailsById = async (req, res, next) => {

    try {
        const { id } = req.params;

        const result = await detailsToursByIdServices(id);
        result.view += 1;
        result.save();
        res.status(200).json({
            status: "Success",
            message: "Get data successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "can  not get data successfully",
            error: error.message
        });
    }
}

exports.createTours = async (req, res, next) => {
    try {
        const result = await createToursServices(req.body);

        res.status(200).json({
            status: "Success",
            message: "Data inserted successfully",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data  not inserted",
            error: error.message
        });
    }
}


exports.updateTours = async (req, res, next) => {

    try {
        const toursId = req.params.id;
        const result = await updateToursServices(toursId, req.body);

        res.status(200).json({
            status: "Success",
            message: 'Data updated successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data updated failed",
            error: error.message
        });
    }
}

exports.deleteToursById = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await deleteToursByIdServices(id);

        if (!result.deletedCount) {
            res.status(400).json({
                status: "Success",
                message: "could't delete the data",
                data: result
            })
        } else {
            res.status(200).json({
                status: "Success",
                message: 'Data delete successfully',
                data: result
            })
        }


    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Data delete failed",
            error: error.message
        });
    }
}

