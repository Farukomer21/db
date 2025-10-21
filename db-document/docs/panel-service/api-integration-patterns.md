Error rendering document: ejs:1
 >> 1| <% 
    2| const services = serviceModel.services || [];
    3| const projectName = serviceModel.name ;
    4| const ProjectName = projectName?.charAt(0)?.toUpperCase() + projectName?.slice(1);

serviceModel is not defined