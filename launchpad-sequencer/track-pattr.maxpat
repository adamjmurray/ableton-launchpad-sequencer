{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 5,
			"minor" : 1,
			"revision" : 9
		}
,
		"rect" : [ 149.0, 747.0, 373.0, 137.0 ],
		"bglocked" : 0,
		"defrect" : [ 149.0, 747.0, 373.0, 137.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-3",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 14.0, 6.0, 326.0, 20.0 ],
					"text" : "track base pitch, base velocity, duration scale, and mute"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 273.0, 38.0, 48.0, 20.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "m",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "m",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr m",
					"varname" : "m"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 196.0, 38.0, 46.0, 20.0 ],
					"restore" : [ 0.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 0,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "d",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "d",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr d",
					"varname" : "d"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 120.0, 38.0, 46.0, 20.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "v",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "v",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr v",
					"varname" : "v"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 50.0, 38.0, 46.0, 20.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_order" : 0,
							"parameter_defer" : 0,
							"parameter_speedlim" : 1.0,
							"parameter_steps" : 0,
							"parameter_invisible" : 1,
							"parameter_exponent" : 1.0,
							"parameter_annotation_name" : "",
							"parameter_unitstyle" : 10,
							"parameter_mmax" : 127.0,
							"parameter_mmin" : 0.0,
							"parameter_type" : 1,
							"parameter_initial_enable" : 0,
							"parameter_shortname" : "p",
							"parameter_modmax" : 127.0,
							"parameter_longname" : "p",
							"parameter_modmin" : 0.0,
							"parameter_linknames" : 0,
							"parameter_modmode" : 0,
							"parameter_info" : "",
							"parameter_units" : ""
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"text" : "pattr p",
					"varname" : "p"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 119.0, 98.0, 118.0, 20.0 ],
					"text" : "poly~ pattern-pattr 8",
					"varname" : "n"
				}

			}
 ],
		"lines" : [  ],
		"parameters" : 		{
			"obj-1.6::obj-1" : [ "q[5]", "q", 0 ],
			"obj-1.7::obj-6" : [ "m[7]", "m", 0 ],
			"obj-1.2::obj-1" : [ "q[1]", "q", 0 ],
			"obj-1.5::obj-2" : [ "t[4]", "t", 0 ],
			"obj-1.2::obj-12" : [ "e[1]", "e", 0 ],
			"obj-1.2::obj-2" : [ "t[1]", "t", 0 ],
			"obj-1.5::obj-6" : [ "m[5]", "m", 0 ],
			"obj-10" : [ "m", "m", 0 ],
			"obj-1.2::obj-11" : [ "s[1]", "s", 0 ],
			"obj-1.1::obj-2" : [ "t", "t", 0 ],
			"obj-1.4::obj-6" : [ "m[4]", "m", 0 ],
			"obj-1.8::obj-1" : [ "q[7]", "q", 0 ],
			"obj-1.1::obj-11" : [ "s", "s", 0 ],
			"obj-1.3::obj-6" : [ "m[3]", "m", 0 ],
			"obj-1.6::obj-11" : [ "s[5]", "s", 0 ],
			"obj-1.8::obj-11" : [ "s[7]", "s", 0 ],
			"obj-1.5::obj-1" : [ "q[4]", "q", 0 ],
			"obj-1.7::obj-1" : [ "q[6]", "q", 0 ],
			"obj-7" : [ "p", "p", 0 ],
			"obj-1.7::obj-12" : [ "e[6]", "e", 0 ],
			"obj-1.7::obj-2" : [ "t[6]", "t", 0 ],
			"obj-1.2::obj-6" : [ "m[2]", "m", 0 ],
			"obj-1.7::obj-11" : [ "s[6]", "s", 0 ],
			"obj-9" : [ "d", "d", 0 ],
			"obj-1.5::obj-11" : [ "s[4]", "s", 0 ],
			"obj-1.8::obj-12" : [ "e[7]", "e", 0 ],
			"obj-1.1::obj-12" : [ "e", "e", 0 ],
			"obj-1.4::obj-1" : [ "q[3]", "q", 0 ],
			"obj-1.6::obj-6" : [ "m[6]", "m", 0 ],
			"obj-1.1::obj-1" : [ "q", "q", 0 ],
			"obj-1.4::obj-12" : [ "e[3]", "e", 0 ],
			"obj-1.4::obj-2" : [ "t[3]", "t", 0 ],
			"obj-1.1::obj-6" : [ "m[1]", "m", 0 ],
			"obj-1.4::obj-11" : [ "s[3]", "s", 0 ],
			"obj-1.8::obj-2" : [ "t[7]", "t", 0 ],
			"obj-1.6::obj-12" : [ "e[5]", "e", 0 ],
			"obj-1.8::obj-6" : [ "m[8]", "m", 0 ],
			"obj-8" : [ "v", "v", 0 ],
			"obj-1.5::obj-12" : [ "e[4]", "e", 0 ],
			"obj-1.3::obj-1" : [ "q[2]", "q", 0 ],
			"obj-1.3::obj-12" : [ "e[2]", "e", 0 ],
			"obj-1.3::obj-2" : [ "t[2]", "t", 0 ],
			"obj-1.3::obj-11" : [ "s[2]", "s", 0 ],
			"obj-1.6::obj-2" : [ "t[5]", "t", 0 ]
		}

	}

}
